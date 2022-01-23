import React, { Component } from 'react'

const listStyle = {
    listStyle: 'none'
}

type OptionProps = {
    value: string
    name: string
}

class LanguageOption extends Component<OptionProps> {

    render() {
        return (
            <option value={this.props.value}>{this.props.name}</option>
        )
    }
}

type LanguageDropdownProps = {
    onChangeLanguage: (language: string) => void
}

type LanguageDropdownState = {}

class LanguageDropdown extends Component<LanguageDropdownProps, LanguageDropdownState> {

    getLanguageList(): OptionProps[] {

        const en = {
            value: "en",
            name: "🇺🇸 English"
        }

        const se = {
            value: "se",
            name: "🇸🇪 Swedish"
        }

        const id = {
            value: "id",
            name: "🇮🇩 Indonesian"
        }

        const fr = {
            value: "fr",
            name: "🇫🇷 Français"
        }

        const de = {
            value: "de",
            name: "🇩🇪 Deutsch"
        }

        const zh = {
            value: "zh",
            name: "🇨🇳 中国人"
        }

        const es = {
            value: "es",
            name: "🇪🇸 Español"
        }

        var languageList: OptionProps[] = []
        languageList.push(id)
        languageList.push(se)
        languageList.push(en)
        languageList.push(de)
        languageList.push(fr)
        languageList.push(zh)
        languageList.push(es)

        return this.shuffle(languageList)
    }

    shuffle(array: any[]) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    render() {

        var languageList = [];

        for (let language of this.getLanguageList()) {
            languageList.push(<LanguageOption name={language.name} value={language.value}  key={language.value}/>);
        }

        return (
            <div>
                <select style={listStyle} onChange={ e => this.props.onChangeLanguage(e.currentTarget.value) } defaultValue={"en"} >
                    {languageList}
                </select>
            </div>
        )
    }
}

export default LanguageDropdown;