import app from 'firebase/app';
import 'firebase/database';

class Firebase {

  db!: app.database.Database;
  language!: string;

  public onLanguageChangedCallback: (() => void) | null = null
  private static instance: Firebase

  constructor(language: string, db: app.database.Database) {
    
    if (Firebase.instance)
      return Firebase.instance

    this.db = db;
    this.language = language;
    Firebase.instance = this;
  }

  setLanguage(language: string) {
    this.language = language
    
    if (this.onLanguageChangedCallback)
      this.onLanguageChangedCallback()
  }

  rootRef(): app.database.Reference {
    return this.db.ref('setoelkahfi-web-id').child(this.language);
  }

  whoAmIRef(): app.database.Reference {
    return this.rootRef().child('i am');
  }

  aboutRef = () => this.rootRef().child('about');
  cvRef = () => this.rootRef().child('cv');
  contactRef = () => this.rootRef().child('contact');
}

export default Firebase;
