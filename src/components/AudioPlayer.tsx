import axios from 'axios';
import React from 'react';
import { Component } from 'react';
import { Container } from 'react-bootstrap';
import YouTube, { Options } from 'react-youtube';
import { GiMicrophone, GiDrumKit, GiGuitarHead, GiGuitarBassHead, GiPianoKeys } from 'react-icons/gi';
import { IconContext } from 'react-icons';
import { db, AudioFiles } from './db';

interface Result {
    source_file: string,
    filename: string
}

interface AudioFile {
    youtube_video_id: string,
    results: Result[]
}

type AudioProps = {
    audioFileId: string
}

type AudioState = {
    audioFile: AudioFile | null,
    isPlayerReady: boolean,
    isPlaying: boolean
}

export enum Mode {
    vocalist, bassist, guitarist, drummer, keyboardist
}

class AudioPlayer extends Component<AudioProps, AudioState> {

    vocalAudio = new Audio();
    guitarAudio = new Audio();
    bassAudio = new Audio();
    drumsAudio = new Audio();
    pianoAudio = new Audio()

    constructor(props: AudioProps) {
        super(props);
        this.state = {
            audioFile: null,
            isPlayerReady: false,
            isPlaying: false
        }
    }

    componentDidMount() {
        axios.get(`/splitfire/${this.props.audioFileId}`)
            .then(res => {
                const audioFile = res.data.audio_file;
                this.setState({ audioFile });
                console.log(this.state);
                this.downloadAudioFilesIfNeeded();
            })
    }

    downloadAudioFilesIfNeeded() {
        this._prepareAudio(Mode.vocalist);
        this._prepareAudio(Mode.bassist);
        this._prepareAudio(Mode.drummer);
        this._prepareAudio(Mode.guitarist);
        this._prepareAudio(Mode.keyboardist);
    }

    _downloadFile(type: Mode) {
        console.log('_downloadFile', type);
        let audioFile: Result | undefined;
        switch (type) {
            case Mode.vocalist:
                audioFile = this.state.audioFile?.results.find(obj => { return obj.filename.startsWith('vocals') });
                break;
            case Mode.bassist:
                audioFile = this.state.audioFile?.results.find(obj => { return obj.filename.startsWith('bass') });
                break;
            case Mode.drummer:
                audioFile = this.state.audioFile?.results.find(obj => { return obj.filename.startsWith('drums') });
                break;
            case Mode.guitarist:
                audioFile = this.state.audioFile?.results.find(obj => { return obj.filename.startsWith('other') });
                break;
            case Mode.keyboardist:
                break;
        }

        const audioFileId = this.props.audioFileId;
        axios({
            url: audioFile?.source_file,
            method: 'GET',
            responseType: 'blob',
        }).then((response) => {
            const file = new Blob([response.data], { type: 'audio/mp3' });
            const item: AudioFiles = {
                audioFileId, type: type, file
            }
            db.audioFiles.add(item);
            console.log('File Downloaded', file);
            this._setAudioSrc(type, file);
        });
    }

    _prepareAudio(type: Mode) {
        const audioFileId = this.props.audioFileId;
        db.audioFiles
            .get({ audioFileId: audioFileId, type: type })
            .then(record => {
                if (record?.file === undefined) {
                    this._downloadFile(type);
                    return
                }
                this._setAudioSrc(type, record.file)
            })
    }

    _setAudioSrc(type: Mode, file: Blob) {
        // Get window.URL object
        var URL = window.URL || window.webkitURL;
        // Create and revoke ObjectURL
        var audioFileURL = URL.createObjectURL(file);

        switch (type) {
            case Mode.vocalist:
                this.vocalAudio.src = audioFileURL;
                break;
            case Mode.bassist:
                this.bassAudio.src = audioFileURL;
                break;
            case Mode.drummer:
                this.drumsAudio.src = audioFileURL;
                break;
            case Mode.guitarist:
                this.guitarAudio.src = audioFileURL;
                break;
            case Mode.keyboardist:
                this.pianoAudio.src = audioFileURL;
                break;
        }
    }

    playAudio() {
        this.vocalAudio.play();
        this.guitarAudio.play();
        this.bassAudio.play();
        this.guitarAudio.play();
        this.drumsAudio.play();
    }

    pauseAudio() {

    }

    setMode(mode: Mode) {
        switch (mode) {
            case Mode.vocalist:
                this.vocalAudio.volume = 0;
                break;
            case Mode.bassist:
                this.bassAudio.volume = 0;
                break;
            case Mode.guitarist:
                this.guitarAudio.volume = 0;
                break;
            case Mode.keyboardist:
                this.pianoAudio.volume = 0;
                break;
            case Mode.drummer:
                this.drumsAudio.volume = 0;
                break;
        }
    }

    render() {
        const opts: Options = {
            playerVars: {
                // https://developers.google.com/youtube/player_parameters
                autoplay: 0,
                mute: 1,
                controls: 0,
                rel: 0,
                showinfo: 0
            },
        };

        let youtubeContent: any = 'Loading player...';
        if (this.state.audioFile) {
            youtubeContent = <YouTube
                videoId={this.state.audioFile?.youtube_video_id}
                opts={opts}
                onReady={this._onReady.bind(this)}
                onStateChange={this._onStateChange.bind(this)}
                onPlay={this._onPlay.bind(this)}
                onPause={this._onPause.bind(this)}
            />
        }

        return (
            <IconContext.Provider value={{ size: "2em", color: "white", className: "global-class-name" }}>
                <Container>
                    <GiMicrophone onClick={() => this.setMode(Mode.vocalist)} />
                    <GiDrumKit onClick={() => this.setMode(Mode.drummer)} />
                    <GiGuitarBassHead onClick={() => this.setMode(Mode.bassist)} />
                    <GiGuitarHead onClick={() => this.setMode(Mode.guitarist)} />
                    <GiPianoKeys onClick={() => this.setMode(Mode.keyboardist)} />
                </Container>
                <Container>
                    {youtubeContent}
                </Container>
            </IconContext.Provider>
        )
    }

    _onReady(event: any) {
        console.log('YouTube ready: ', event)
    }

    _onStateChange(event: any) {
        console.log('State changed: ', event)
    }

    _onPlay() {
        this.playAudio()
    }
    _onPause() {
        this.pauseAudio()
    }
}

export default AudioPlayer;