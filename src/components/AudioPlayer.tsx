/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { CSSProperties } from 'react';
import { Component } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import YouTube, { Options } from 'react-youtube';
import { GiMicrophone, GiDrumKit, GiGuitarHead, GiGuitarBassHead, GiPianoKeys, GiPlayButton } from 'react-icons/gi';
import { IconContext } from 'react-icons';
import { db, AudioFiles } from './db';
import { Channel, Player, Time, Transport } from 'tone';

const buttonStyle: CSSProperties = {

}

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
    playerTime: number,
    isPlayerReady: boolean,
    isYoutubePlayerReady: boolean,
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

    vocalPlayer: Player | null = null;
    otherPlayer: Player | null = null;
    bassPlayer: Player | null = null;
    drumsPlayer: Player | null = null;
    pianoPlayer: Player | null = null;

    constructor(props: AudioProps) {
        super(props);
        this.state = {
            audioFile: null,
            playerTime: 0,
            isPlayerReady: false,
            isYoutubePlayerReady: false,
            isPlaying: false,
            vocalAudioOn: true,
            guitarAudioOn: true,
            bassAudioOn: true,
            drumsAudioOn: true,
            pianoAudioOn: true,
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
            });
    }

    componentWillUnmount() {
        this.pauseAudio();
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
        const URL = window.URL || window.webkitURL;
        // Create and revoke ObjectURL
        const audioFileURL = URL.createObjectURL(file);
        const channel = new Channel().toDestination();

        switch (type) {
            case Mode.vocalist:
                this.vocalPlayer = new Player({ url: audioFileURL, onload: this._updatePlayerStatus })
                this.vocalPlayer.connect(channel);
                break;
            case Mode.bassist:
                this.bassPlayer = new Player({ url: audioFileURL, onload: this._updatePlayerStatus })
                this.bassPlayer.connect(channel);
                break;
            case Mode.drummer:
                this.drumsPlayer = new Player({ url: audioFileURL, onload: this._updatePlayerStatus })
                this.drumsPlayer.connect(channel);
                break;
            case Mode.guitarist:
                this.otherPlayer = new Player({ url: audioFileURL, onload: this._updatePlayerStatus })
                this.otherPlayer.connect(channel);
                break;
            case Mode.keyboardist:
                this.pianoPlayer = new Player({ url: audioFileURL, onload: this._updatePlayerStatus })
                this.pianoPlayer.connect(channel);
                break;
        }
    }

    _updatePlayerStatus: (() => void) = () => {
        if (
            this.vocalPlayer?.loaded && 
            this.drumsPlayer?.loaded &&
            this.otherPlayer?.loaded &&
            this.bassPlayer?.loaded &&
            this.pianoPlayer?.loaded
        ) {
            this.setState({ isPlayerReady: true });
        }
    }

    playAudio(at: number) {
        this.vocalPlayer?.seek(at).start()
        this.bassPlayer?.seek(at).start()
        this.drumsPlayer?.seek(at).start()
        this.pianoPlayer?.seek(at).start()
        this.otherPlayer?.seek(at).start()
    
        console.log("Start playing at", at);
    }

    pauseAudio() {
        this.vocalPlayer?.stop();
        this.bassPlayer?.stop();
        this.drumsPlayer?.stop();
        this.pianoPlayer?.stop();
        this.otherPlayer?.stop();

        console.log("Stop playing");
    }

    setToggleInstrument(mode: Mode) {
        switch (mode) {
            case Mode.vocalist:
                if (!this.vocalPlayer) return;
                this.setState({ vocalAudioOn: !this.state.vocalAudioOn });
                this.vocalPlayer.mute = this.state.vocalAudioOn;
                break;
            case Mode.bassist:
                if (!this.bassPlayer) return;
                this.setState({ bassAudioOn: !this.state.bassAudioOn });
                this.bassPlayer.mute = this.state.bassAudioOn;
                break;
            case Mode.guitarist:
                if (!this.otherPlayer) return;
                this.setState({ guitarAudioOn: !this.state.guitarAudioOn });
                this.otherPlayer.mute = this.state.guitarAudioOn;
                break;
            case Mode.keyboardist:
                if (!this.pianoPlayer) return;
                this.setState({ pianoAudioOn: !this.state.pianoAudioOn });
                this.pianoPlayer.mute = this.state.pianoAudioOn;;
                break;
            case Mode.drummer:
                if (!this.drumsPlayer) return;
                this.setState({ drumsAudioOn: !this.state.drumsAudioOn });
                this.drumsPlayer.mute = this.state.drumsAudioOn;
                break;
        }
    }

    render() {
        if (this.state.isPlayerReady) {
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
            return (
                <IconContext.Provider value={{ size: "2em", color: "white", className: "global-class-name" }}>
                    <Row className="mb-3 mt-3">
                        <Col>
                            <GiMicrophone
                                color={this.state.vocalAudioOn ? `white` : `red`}
                                onClick={() => this.setToggleInstrument(Mode.vocalist)}
                                style={buttonStyle} />
                        </Col>
                        <Col>
                            <GiDrumKit
                                color={this.state.drumsAudioOn ? `white` : `red`}
                                onClick={() => this.setToggleInstrument(Mode.drummer)}
                                style={buttonStyle} />
                        </Col>
                        <Col>
                            <GiGuitarBassHead
                                color={this.state.bassAudioOn ? `white` : `red`}
                                onClick={() => this.setToggleInstrument(Mode.bassist)}
                                style={buttonStyle} />
                        </Col>
                        <Col>
                            <GiGuitarHead
                                color={this.state.guitarAudioOn ? `white` : `red`}
                                onClick={() => this.setToggleInstrument(Mode.guitarist)}
                                style={buttonStyle} />
                        </Col>
                        <Col>
                            <GiPianoKeys
                                color={this.state.pianoAudioOn ? `white` : `red`}
                                onClick={() => this.setToggleInstrument(Mode.keyboardist)}
                                style={buttonStyle} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <YouTube
                                videoId={this.state.audioFile?.youtube_video_id}
                                opts={opts}
                                onReady={this._onReady.bind(this)}
                                onStateChange={this._onStateChange.bind(this)}
                            />
                        </Col>
                    </Row>
                </IconContext.Provider>
            )
        } else {
            return (
                <Row>
                    <Col className="mb-3 mt-3">
                        <p>Loading player...</p>
                        <Spinner animation='grow'></Spinner>
                    </Col>
                </Row>
            )
        }
    }

    _onReady(event: any) {
        console.log('YouTube ready: ', event);
        this.setState({ isYoutubePlayerReady: true });
    }

    _onStateChange(event: any) {
        console.log('State changed: ', event)
        console.log('getCurrentTime: ', event.target.getCurrentTime())
        console.log('getPlayerState: ', event.target.getPlayerState())

        if (event.target.getPlayerState() === 1) { // Play
            const at = event.target.getCurrentTime()
            this.playAudio(at)
        } else if (event.target.getPlayerState() === 2) {// pause
            this.pauseAudio()
        }
    }
}

export default AudioPlayer;