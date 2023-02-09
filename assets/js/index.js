class AppCalcularDesconto{
    constructor(){
        this.section = document.querySelector('section')
        this.inputCalcular = this.section.querySelector('#calcular')
        this.customInput = this.section.querySelector('#customInput')
        this.percentageAtual = this.section.querySelector('.percentageCurrent')
        this.numberPeople = this.section.querySelector('#numberPeople')
        this.calcularTotal = this.section.querySelector('#calcularTotal')
        this.percentage = this.section.querySelectorAll('.percentage')
        this.numberPercentage = 0
        this.totalAPagarPorPessoa = 0
        this.total = 0
    }
    init(){
        this.calcularClick()
        this.calcularOnSubmit()
        this.customPercentage()

    }
    calcular(){
        const inputValueCalcular = parseInt(this.inputCalcular.value)
        const inputValuePeople = parseInt(this.numberPeople.value)


        this.inputCalcular.classList.remove('inputError')
        this.numberPeople.classList.remove('inputError')
        this.customInput.classList.remove('inputError')
        this.percentage.forEach(percentage => percentage.classList.remove('percentageError'))

        let valid = true

        if(!inputValueCalcular) {
            this.inputCalcular.classList.add('inputError')
            this.err('Digete um valor maior que 0 para o campo "Valor da conta".')
            valid = false
        }
        if(!inputValuePeople) {
            this.numberPeople.classList.add('inputError')
            this.err('Digete um valor maior que 0 para o campo "Número de pessoas a pagar a conta".')
            valid = false
        }

        if(!this.numberPercentage) {
            this.customInput.blur()
            this.percentage.forEach(percentage => percentage.classList.add('percentageError'))
            this.customInput.classList.add('inputError')
            this.err('Escolha uma porcentagem maior que 0.')
            valid = false
        }

        if(!valid) return

        this.total = inputValueCalcular - (inputValueCalcular * (this.numberPercentage / 100))
        this.totalAPagarPorPessoa = this.total / inputValuePeople
        if(!this.totalAPagarPorPessoa || !this.total) {
            this.err('Calculo inválido, por favor tente novalmente.')
            return
        }

        const valorAPagarPorPessoa = this.section.querySelector('.valor-gojeta')
        const valorTotalAPagar = this.section.querySelector('.valor-total')

        valorAPagarPorPessoa.innerText = this.totalAPagarPorPessoa.toFixed(2)
        valorTotalAPagar.innerText = this.total.toFixed(2)
    }
    calcularClick(){
        this.calcularTotal.addEventListener('click', () => this.calcular())
    }
    calcularOnSubmit(){
        this.inputCalcular.parentElement.addEventListener('submit', (event) => {
            event.preventDefault()
            this.calcular()
        })
        this.customInput.parentElement.addEventListener('submit', (event) => {
            event.preventDefault()
            const customInputValue = event.target.querySelector('input[type="number"]').value
            if(!customInputValue) return

            this.section.querySelectorAll('.percentage').forEach(percentage => percentage.classList.remove('percentageActived'))
            this.numberPercentage = parseFloat(customInputValue)

            this.calcular()
        })
        this.numberPeople.parentElement.addEventListener('submit', (event) => {
            event.preventDefault()
            this.calcular()
        })
    }
    customPercentage(){
        this.section.querySelectorAll('.percentage').forEach(percentage => percentage.addEventListener('click', event => {
            this.removeClassPocentActived() 

            if(customInput.value) customInput.value = ''      

            const targetEvent = event.target;
            targetEvent.classList.add('percentageActived')
            const { innerText } = targetEvent;
            this.percentageAtual.innerText = innerText
            this.numberPercentage = parseInt(innerText.slice(0, -1))
        }))
        this.customInput.addEventListener('focusout', event => { // bug aqui
            const value  = parseInt(event.target.value);
            if(value == 0) {
                this.customInput.blur()
                this.percentage.forEach(percentage => percentage.classList.add('percentageError'))
                this.customInput.classList.add('inputError')
                this.err('Escolha uma porcentagem maior que 0.')
                return
            }
            if(!value) return
            
            this.removeClassPocentActived()
            this.percentageAtual.innerText = `${value}%`
        })
        this.customInput.addEventListener('input', event => {
            const { value } = event.target;
            if(value.length > 5 )  event.target.value = value.slice(0, 5)
        })
        this.inputCalcular.addEventListener('input', event => {
            const { value } = event.target;
            if(value.length > 8 )  event.target.value = value.slice(0, 8)
        })
        this.numberPeople.addEventListener('input', event => {
            const { value } = event.target;
            if(value.length > 5 )  event.target.value = value.slice(0, 5)
        })
    }
    err(errText){
        return setTimeout(() => alert(errText), 300)
    }
    removeClassPocentActived(){
        this.section.querySelectorAll('.percentage').forEach(percentage => percentage.classList.remove('percentageActived'))
        this.percentage.forEach(percentage => percentage.classList.remove('percentageError'))
        this.customInput.classList.remove('inputError')
    }


}

const app = new AppCalcularDesconto()

app.init()