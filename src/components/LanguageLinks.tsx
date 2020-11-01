import React, { Component } from 'react'

const imgFlag = {
    width: 16,
    height: 11
}

type LinkProps = {
    link: string
    icon: string
    altTag: string
}

class LanguageLink extends Component<LinkProps> {

    render() {
        return(
            <li>
                <a href={this.props.link}>
                    <img src={this.props.icon} alt={this.props.altTag} style={imgFlag}/>
                </a>
            </li>
        )
    }
}

class LanguageLinks extends Component {

    getLanguageList(): LinkProps[] {

        const en = {
            link: "https://setoelkahfi.com",
            icon: "en-flag-icon-16.png",
            altTag: "UK Flag"
        }

        const sv = {
            link: "https://setoelkahfi.se",
            icon: "sv-flag-icon-16.png",
            altTag: "Sweden Flag"
        }

        const id = {
            link: "https://setoelkahfi.id",
            icon: "id-flag-icon-16.png",
            altTag: "Indonesian Flag"
        }

        var language = "en"
        const tld = window.location.hostname.split('.').pop()
        
        if (tld === "id") {
            language = "id"
        } else if (tld === "se") {
            language = "se"
        }
        
        var languageList: LinkProps[] = []
        if (language !== "id") {
            languageList.push(id)
        }
        if (language !== "se") {
            languageList.push(sv)
        }
        if (language !== "en") {
            languageList.push(en)
        }

        return languageList
    }

    render() {

        var languageList = [];
        for (let language of this.getLanguageList()) {
            languageList.push(<LanguageLink icon={language.icon} link={language.link} altTag={language.altTag} />);
        }

        return(
            <div>
                <ul>
                    {languageList}
                </ul>
            </div>
        )
    }
}

export default LanguageLinks