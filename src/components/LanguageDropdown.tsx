import React, { Component } from 'react'
import { supportedLangs } from '../shared/i18n'

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
    selectedLanguage: string
}

type LanguageDropdownState = {}

class LanguageDropdown extends Component<LanguageDropdownProps, LanguageDropdownState> {

    getLanguageList(): OptionProps[] {
        const languageList: OptionProps[] = supportedLangs.map((lang) => {
            return {
                value: lang.code,
                name: lang.name
            }
        })

        return languageList
    }

    render() {

        var languageList = [];

        for (let language of this.getLanguageList()) {
            languageList.push(<LanguageOption name={language.name} value={language.value}  key={language.value}/>);
        }

        return (
            <div>
                <select 
                style={listStyle} 
                onChange={ e => this.props.onChangeLanguage(e.currentTarget.value) } 
                value={this.props.selectedLanguage} 
                >
                    {languageList}
                </select>
            </div>
        )
    }
}

export default LanguageDropdown;