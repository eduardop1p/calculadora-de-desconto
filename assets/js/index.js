class AppCalcularDesconto{
    constructor(){
        this.section = document.querySelector('section')
        this.inputCalcular = this.section.querySelector('#calcular')
        this.percentageAtual = this.section.querySelector('.pocentagemAtual')
        this.numberPeople = this.section.querySelector('#numberPeople')
        this.calcularTotal = this.section.querySelector('#calcularTotal')
        this.numberPercentage = 0
        this.totalAPagarPorPessoa = 0
        this.total = 0
    }
    init(){
        this.calcularClick()
        this.calcularKeyEnter()
        this.customPercentage()

    }
    calcular(){
        const inputValueCalcular = parseInt(this.inputCalcular.value)
        const inputValuePeople = parseInt(this.numberPeople.value)

        this.inputCalcular.classList.remove('inputError')
        this.numberPeople.classList.remove('inputError')

        if(!validate.isNumber(inputValueCalcular)) {
            this.inputCalcular.classList.add('inputError')
            this.err('Digete um valor maior que 0 para os campo "Valor da conta".')
            return
        }
        if(!validate.isNumber(inputValuePeople)) {
            this.numberPeople.classList.add('inputError')
            this.err('Digete um valor maior que 0 para o campo "Número de pessoas a pagar a conta".')
            return
        }
        if(!this.numberPercentage) {
            this.err('Escolha uma porcentagem maior que 0.')
            return
        }
        this.totalAPagarPorPessoa = (inputValueCalcular * (this.numberPercentage / 100) / inputValuePeople) 
        this.total = inputValueCalcular * (this.numberPercentage / 100) 

        const valorAPagarPorPessoa = this.section.querySelector('.valor-gojeta')
        const valorTotalAPagar = this.section.querySelector('.valor-total')
        valorAPagarPorPessoa.innerText = this.totalAPagarPorPessoa.toFixed(2)
        valorTotalAPagar.innerText = this.total.toFixed(2)
    }
    calcularClick(){
        this.calcularTotal.addEventListener('click', () => this.calcular())
    }
    calcularKeyEnter(){
        document.onkeyup = event => event.keyCode === 13 && this.calcular()
    }
    customPercentage(){
        this.section.querySelectorAll('.percentage').forEach(percentage => percentage.addEventListener('click', event => {
            this.removeClassPocentActived() 
            const customInput = this.section.querySelector('#customInput')
            if(customInput.value) customInput.value = ''      

            const targetEvent = event.target;
            targetEvent.classList.add('pocentActived')
            const { innerText } = targetEvent;
            this.percentageAtual.innerText = innerText
            this.numberPercentage = parseInt(innerText.slice(0, -1))
        }))
        this.section.querySelector('#customInput').addEventListener('focusout', event => {
            const { value } = event.target;
            if(!value) return
            
            this.removeClassPocentActived()
            this.percentageAtual.innerText = `${value}%`
            this.numberPercentage = parseInt(value)
        })
        this.section.querySelector('#customInput').addEventListener('input', event => {
            const { value } = event.target;
            if(value.length > 5 )  event.target.value = value.slice(0, 5)
        })
        this.section.querySelector('#calcular').addEventListener('input', event => {
            const { value } = event.target;
            if(value.length > 8 )  event.target.value = value.slice(0, 8)
        })
    }
    err(errText){
        return setTimeout(() => alert(errText), 100)
    }
    removeClassPocentActived(){
        this.section.querySelectorAll('.percentage').forEach(percentage => percentage.classList.remove('pocentActived'))
    }


}

const app = new AppCalcularDesconto()

app.init()