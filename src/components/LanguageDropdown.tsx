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

        const sv = {
            value: "se",
            name: "🇸🇪 Swedish"
        }

        const id = {
            value: "id",
            name: "🇮🇩 Indonesian"
        }

        var languageList: OptionProps[] = []
        languageList.push(id)
        languageList.push(sv)
        languageList.push(en)

        return languageList
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