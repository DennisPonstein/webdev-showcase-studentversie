class GDPR {

    constructor() {
        this.showStatus();
        this.showContent();
        this.bindEvents();

        if(this.cookieStatus() !== 'accept' || 'reject') this.showGDPR();
    }

    bindEvents() {
        let buttonAccept = document.querySelector('.gdpr-consent__button--accept');
        buttonAccept.addEventListener('click', () => {
            this.cookieStatus('accept');
            this.showStatus();
            this.showContent();
            this.hideGDPR();
        });


//student uitwerking
        let buttonReject = document.querySelector('.gdpr-consent__button--reject');
        buttonReject.addEventListener('click', () => {
            this.cookieStatus('reject');
            this.showStatus();
            this.showContent();
            this.hideGDPR();
        });

    }

    showContent() {
        this.resetContent();
        const status = this.cookieStatus() == null ? 'not-chosen' : this.cookieStatus();
        const element = document.querySelector(`.content-gdpr-${status}`);
        element.classList.add('show');

    }

    resetContent(){
        const classes = [
            '.content-gdpr-accept',

//student uitwerking
            '.content-gdpr-reject',
            '.content-gdpr-not-chosen'];

        for(const c of classes){
            document.querySelector(c).classList.add('hide');
            document.querySelector(c).classList.remove('show');
        }
    }

    showStatus() {
        document.getElementById('content-gpdr-consent-status').innerHTML =
            this.cookieStatus() == null ? 'Niet gekozen' : this.cookieStatus();
    }

    cookieStatus(status) {
        
        if (status) {
            localStorage.setItem('gdpr-consent-choice', status);
            this.safeMetaData();
        }
       
        //student uitwerking
        
        return localStorage.getItem('gdpr-consent-choice');
    }

    //student uitwerking

    safeMetaData() {
        let currentDate = new Date();

        /*
        Date.parse() and the Date() constructor both accept strings in the date time string format as input. Furthermore, 
        implementations are allowed to support other date formats when the input fails to match this format.

        */
        let currentDateFormattednew = new Date('DD-MMYYYY');
        //let currentTimeFormatted

        let currentDateFormatted = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
        let currentTimeFormatted = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
        let dateTime = { datum: currentDateFormattednew, tijd: currentTimeFormatted };
        localStorage.setItem('gdpr-consent-date', JSON.stringify(dateTime));
    }


    hideGDPR(){
        document.querySelector(`.gdpr-consent`).classList.add('hide');
        document.querySelector(`.gdpr-consent`).classList.remove('show');
    }

    showGDPR(){
        document.querySelector(`.gdpr-consent`).classList.add('show');
    }

}

const gdpr = new GDPR();

