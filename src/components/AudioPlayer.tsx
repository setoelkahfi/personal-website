/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React from 'react';
import { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
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
    vocalAudioOn: boolean
    guitarAudioOn: boolean
    bassAudioOn: boolean
    drumsAudioOn: boolean
    pianoAudioOn: boolean
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
            isPlaying: false,
            vocalAudioOn: false,
            guitarAudioOn: false,
            bassAudioOn: false,
            drumsAudioOn: false,
            pianoAudioOn: false,
        }
    }

    componentDidMount() {
        axios.get(`/splitfire/${this.props.audioFileId}`)
            .then(res => {
                console.log("Get results", res);
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

    async _downloadFile(type: Mode) {
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
                audioFile = this.state.audioFile?.results.find(obj => { return obj.filename.startsWith('piano') });
                break;
        }

        const audioFileId = this.props.audioFileId;
        console.log("Download url", audioFile?.source_file);
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
        }).catch(error => {
            console.log(error);
        });
    }

    async _prepareAudio(type: Mode) {
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
            .catch(onrejected => {
                console.log("Rejected", onrejected);
            });
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
        this.vocalAudio.pause();
        this.guitarAudio.pause();
        this.bassAudio.pause();
        this.guitarAudio.pause();
        this.drumsAudio.pause();
    }

    setToggleInstrument(mode: Mode) {
        switch (mode) {
            case Mode.vocalist:
                this.setState({vocalAudioOn: !this.state.vocalAudioOn});
                this.vocalAudio.volume = this.state.vocalAudioOn ? 1 : 0;
                break;
            case Mode.bassist:
                this.setState({bassAudioOn: !this.state.bassAudioOn});
                this.bassAudio.volume = this.state.bassAudioOn ? 1 : 0;;
                break;
            case Mode.guitarist:
                this.setState({guitarAudioOn: !this.state.guitarAudioOn});
                this.guitarAudio.volume = this.state.guitarAudioOn ? 1 : 0;;
                break;
            case Mode.keyboardist:
                this.setState({pianoAudioOn: !this.state.pianoAudioOn});
                this.pianoAudio.volume = this.state.pianoAudioOn ? 1 : 0;;
                break;
            case Mode.drummer:
                this.setState({drumsAudioOn: !this.state.drumsAudioOn});
                this.drumsAudio.volume = this.state.drumsAudioOn ? 1 : 0;;
                break;
        }
    }

    render() {
        const opts: Options = {
            width: '100%',
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
                <Row className="mb-3 mt-3">
                    <Col>
                        <a href='javascript:void(0)' onClick={() => this.setToggleInstrument(Mode.vocalist)} >
                            <GiMicrophone color={this.state.vocalAudioOn ? `white` : `red`} />
                        </a>
                    </Col>
                    <Col>
                        <a href='javascript:void(0)' onClick={() => this.setToggleInstrument(Mode.drummer)} >
                            <GiDrumKit color={this.state.drumsAudioOn ? `white` : `red`} />
                        </a>
                    </Col>
                    <Col>
                        <a href='javascript:void(0)' onClick={() => this.setToggleInstrument(Mode.bassist)} >
                            <GiGuitarBassHead color={this.state.bassAudioOn ? `white` : `red`} />
                        </a>
                    </Col>
                    <Col>
                        <a href='javascript:void(0)' onClick={() => this.setToggleInstrument(Mode.guitarist)} >
                            <GiGuitarHead color={this.state.guitarAudioOn ? `white` : `red`} />
                        </a>
                    </Col>
                    <Col>
                        <a href='javascript:void(0)' onClick={() => this.setToggleInstrument(Mode.keyboardist)} >
                            <GiPianoKeys color={this.state.pianoAudioOn ? `white` : `red`} />
                        </a>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {youtubeContent}
                    </Col>
                </Row>
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