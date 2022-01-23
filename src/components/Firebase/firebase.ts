import app from 'firebase/app';
import 'firebase/database';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyBDMgSgpCGpPQVs2ziPm5igl2nL8I6jdeQ",
  authDomain: "blazing-fire-5965.firebaseapp.com",
  databaseURL: "https://blazing-fire-5965.firebaseio.com",
  projectId: "blazing-fire-5965",
  storageBucket: "blazing-fire-5965.appspot.com",
  messagingSenderId: "1043865982157"
};

class Firebase {

  db: app.database.Database;
  language: string;

  public onLanguageChangedCallback: (() => void) | null = null

  constructor(language: string) {
    app.initializeApp(config);
    this.db = app.database();
    this.language = language;
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
