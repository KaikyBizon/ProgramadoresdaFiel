class Validator {

    constructor() {
        this.validations = [
            'data-min-length',
            'data-max-length',
            'data-email-validate',
            'data-required',
            'data-only-letters',
            'data-equal',
            'data-password-validate',
        ]
    }

    //Início da validação dos campos
    validate(form) {

        //Limpa as validações antigas
        let currentValidations = document.querySelectorAll('form .error-validation');

        if (currentValidations.length) {
            this.cleanValidations(currentValidations);
        }

        //Pegar todos os inputs
        let inputs = form.getElementsByTagName('input');
        //Colocar os inputs em lista
        let inputsArray = [...inputs];

        //Loop para percorrer os inputs da lista
        inputsArray.forEach(function (input, obj) {

            //Fazer validação de acordo com os atributos do input
            for (let i = 0; this.validations.length > i; i++) {
                if (input.getAttribute(this.validations[i]) != null) {

                    //Limpa string para saber o método
                    let method = this.validations[i].replace("data-", "").replace("-", "");

                    //Valor do input
                    let value = input.getAttribute(this.validations[i])

                    //Invoca O método
                    this[method](input, value);
                }
            }
        }, this);
    }
    //Método para validar o máximo de caracteres
    minlength(input, minValue) {
        let inputLength = input.value.length;

        let errorMessage = `O campo necessita de pelo menos ${minValue}`;

        if (inputLength < minValue) {
            this.printMessage(input, errorMessage);
        }
    }
    //Método para validar o máximo de caracteres
    maxlength(input, maxValue) {
        let inputLength = input.value.length;

        let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;

        if (inputLength > maxValue) {
            this.printMessage(input, errorMessage);
        }
    }

    //Método para validar as letras
    onlyletters(input) {
        let re = /^[A-Za-z]+$/;;

        let inputValue = input.value;
        let errorMessage = `Este campo não aceita números nem caracteres especiais`;

        if (!re.test(inputValue)) {
            this.printMessage(input, errorMessage);
        }
    }

    //Método para validar email

    emailvalidate(input) {
        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Insira um e-mail no padrão starlist@sp.senai.br`;

        if (!re.test(email)) {
            this.printMessage(input, errorMessage);
        }
    }

    //Verificar se um campo está igual ao outro
    equal(input, inputName) {
        let inputToCompare = document.getElementsByName(inputName)[0];

        let errorMessage = `Este campo precisa estar igual ao ${inputName}`;

        if (input.value != inputToCompare.value) {
            this.printMessage(input, errorMessage);
        }
    }

    //Método para exibir quais inputs são necessários

    required(input) {
        let inputValue = input.value;

        if (inputValue === '') {
            let errorMessage = `Você deve preencher este campo`;

            this.printMessage(input, errorMessage);
        }
    }

    //Validar o campo senha
    passwordvalidate(input) {
        let charArr = input.value.split("");

        let uppercases = 0;
        let numbers = 0;

        for (let i = 0; charArr.length > i; i++) {
            if (charArr[i] === charArr[i].toUppercase() && isNaN(parseInt(charArr[i]))) {
                uppercases++;
            } else if (!isNaN(parseInt(charArr[i]))) {
                numbers++;
            }
        }

        if (uppercases === 0 || numbers === 0) {
            let errorMessage = `A senha precisa ter ao menos um caractere maiúsculo e um número`;

            this.printMessage(input, errorMessage);
        }
    }
    //Validar idade

    //Método para imprimir mensagem de erro
    printMessage(input, msg) {

        //checa os erros presentes no input
        let errosQty = input.parentNode.querySelector('.error-validation');

        //Imprime erro na variavel que estiver errada
        if (errosQty === null) {
            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove('template');
            inputParent.appendChild(template);
        }
    }

    //remove as validações para fazer a checagem novamente
    cleanValidations(validations) {
        validations.forEach(el => el.remove());
    }
}
function limpaForm() {
    const formulario = document.querySelector('#right-login');
    formulario.reset();
}
let form = document.getElementById('right-login');
let submit = document.getElementById('btn-submit');

let validator = new Validator();

//Evento de envio do form, que valida os inputs

submit.addEventListener('click', function (e) {
    e.preventDefault();

    validator.validate(form);
});