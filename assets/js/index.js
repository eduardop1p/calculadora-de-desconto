class AppCalcularDesconto{
    constructor(){
        this.section = document.querySelector('section')
        this.inputCalcular = this.section.querySelector('#calcular')
        this.pocentagemAtual = this.section.querySelector('.pocentagemAtual')
        this.numberPeople = this.section.querySelector('#numberPeople')
        this.descontoValor = null
        this.valid = false
    }
    init(){
        this.calcular()
        this.total()
        this.inputsInFocus()
        this.custom()
    }
    clickActved(element){
        element.classList.add('clickActived')
        setTimeout(()=>element.classList.remove('clickActived'), 500);
    }
    err(errText){
        return setTimeout(() => alert(errText), 50)
    }
    calcular(){
        this.section.addEventListener('click', event =>{
            const element = event.target
            if(element.className !== 'porcent') return
            this.clickActved(element)
            this.pocentActived(element)
            this.pocentagemAtual.innerHTML = element.innerHTML
            this.valid = true
        })
    }
    desconto(){
        const calculo = Number(this.inputCalcular.value)
        const desconto = this.pocentagemAtual.innerHTML.slice(0,-1)
        const porcentagem = calculo * desconto / 100
        const descontoGorjeta = porcentagem
        return this.descontoValor = descontoGorjeta
    }
    customValid(customElemnt){
        this.section.querySelectorAll('.porcent').forEach(porcent => porcent.classList.remove('pocentActived'))
        if(!customElemnt.value) return
        if(!Number(customElemnt.value)) return this.err('No campo Custom é aceito somente números.')
        this.pocentagemAtual.innerHTML = `${customElemnt.value}%`
        this.valid = true
    }
    custom(){
        const customElemnt = this.section.querySelector('#customInput')
        customElemnt.addEventListener('focusin', ()=>{
            this.section.querySelector('.custom').classList.add('customInFocus')
        })
        customElemnt.addEventListener('focusout', ()=> {
            this.section.querySelector('.custom').classList.remove('customInFocus')
            this.customValid(customElemnt)
        })
        customElemnt.addEventListener('keyup', event => {
            if(event.keyCode === 13 ) {
                this.customValid(customElemnt)
            }
        })
    }
    total(){
        const calcularTotal = this.section.querySelector('#calcularTotal')
        const valorGojeta = this.section.querySelector('.valor-gojeta')
        const valorTotalAPagarGojeta = this.section.querySelector('.valor-total')
        calcularTotal.addEventListener('click', ()=>{
            this.clickActved(calcularTotal)
            if(!this.valid) return this.err('Você tem que colocar uma porcentagem para realizar o calculo kkkk!!')
            this.desconto()
            this.custom()
            if(!this.descontoValor && this.descontoValor !== 0) return this.err('Conta inválida kkkk')
            // if(!Number(this.numberPeople.value)) return this.errNumberPeople()
            this.section.querySelector('.number-people').classList.remove('errNumberPeople')

            let valorTotalGojetaPorPessoa =  Number(this.descontoValor / this.numberPeople.value) 
            valorTotalGojetaPorPessoa === Infinity || !this.descontoValor ? valorTotalGojetaPorPessoa = this.descontoValor : valorTotalGojetaPorPessoa
            valorGojeta.innerHTML = valorTotalGojetaPorPessoa.toFixed(2)

            let totalApagarGojeta = Number(valorTotalGojetaPorPessoa * this.numberPeople.value)
            totalApagarGojeta === 0 ? totalApagarGojeta = valorTotalGojetaPorPessoa : totalApagarGojeta
            valorTotalAPagarGojeta.innerHTML  = totalApagarGojeta.toFixed(2)
        })
    }
    
    inputsInFocus(){
        this.inputCalcular.addEventListener('focusin', ()=> {
            this.section.querySelector('.calculo-input').classList.add('inputFocus')
            this.inputCalcular.addEventListener('focusout', ()=> this.section.querySelector('.calculo-input').classList.remove('inputFocus'))
        })

        this.numberPeople.addEventListener('focusin', ()=> {
            this.section.querySelector('.number-people').classList.add('inputFocus')
            this.numberPeople.addEventListener('focusout', ()=> this.section.querySelector('.number-people').classList.remove('inputFocus'))
        })
        
    }
    pocentActived(element){
        this.section.querySelectorAll('.porcent').forEach(porcent => porcent.classList.remove('pocentActived'))
        element.classList.add('pocentActived')
    }
    errNumberPeople(){
        this.section.querySelector('.number-people').classList.add('errNumberPeople')
        this.err('Numero de pessoas inválido ou igual a zero.')
    }
}

const app = new AppCalcularDesconto()

app.init()