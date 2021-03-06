﻿class CalcController {
    
    constructor() {

        this._operation = [];
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector('#display');
        this._dateEl = document.querySelector('#data');
        this._timeEl = document.querySelector('#hora');
        this._currentDate; 
        this.initialize();
        this.initButtonsEvents();
    }

    initialize() {
        this.displayCalc = 0;
        this.setDisplayDateTime();
        let interval = setInterval(()=>{
          this.setDisplayDateTime();
        }, 1000);
    }

    addEventListener(element, events, func) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, func);
        })

    }

    clearAll() {
        this._operation = [];
    }

    cancelEntry() {
        this._operation.pop();
    }

    setError() {
        this.displayCalc = "Error";
    }

    getLastOperation() {
        return this._operation[this._operation.length - 1];
    }

    isOperator(value) {
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1);
    }

    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value;
    }

    calc() {
        let last = this._operation.pop();
        let result = eval(this._operation.join(""));
        this._operation = [result, last];
        this.setLastNumberToDisplay();
    }

    pushOperator(value) {
        this._operation.push(value);

        if(this._operation.length > 3) {
            this.calc();
        }
        
    }

    setLastNumberToDisplay() {

        let lastNumber;

        for(let i = this._operation.length - 1; i >= 0; i--) {
            if(!this.isOperator(this._operation[i])) {
                lastNumber = this._operation[i];
                break;
            }
        }
        this.displayCalc = lastNumber;
    }

    addOperation(value) {

        if(isNaN(this.getLastOperation())) {
            if(this.isOperator(value)) {
                this.setLastOperation(value);
            } else if(isNaN(value)) {
                console.log(value);
            } else {
                this.pushOperator(value);
                this.setLastNumberToDisplay();
            }

        } else if(isNaN(value)) {
            this.pushOperator(value);
        }  else {
            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(parseInt(newValue));
            this.setLastNumberToDisplay();
        }
    }

    execBtn(value) {
        switch(value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.cancelEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                this.addOperation('=');
                break;
            case 'ponto':
                this.addOperation('.');
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7': 
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;




            default:
                this.setError();
                break;
            
        }
    }

    initButtonsEvents() {
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        buttons.forEach((btn, index)=>{
            this.addEventListener(btn, "click drag", e=>{
                let text = btn.className.baseVal.replace("btn-", "");

                this.execBtn(text);
            })

            this.addEventListener(btn, "mouseover mouseup, mousedown", e=>{
                btn.style.cursor = 'pointer';
            })
        })
        
    }

    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, 
            {});
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(displayCalc) {
        this._displayCalcEl.innerHTML = displayCalc;
    }

    get displayTime() {
        return this._timeEl.innerHTML;
    }

    set displayTime(time) {
        this._timeEl.innerHTML = time;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(date) {
        this._dateEl.innerHTML = date;
    }


    get currentDate() {
        return new Date();
    }

    set currentDate(currentDate) {
        this._currentDate = currentDate;
    }
}
