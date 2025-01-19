import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector("form")

const clearForm = () => {
    form.reset()    
}

const onFormSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {
        input: formData.get('delay'),
        radio: formData.get('state'),
    }    

    const makePromise = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (data.radio === "fulfilled") {
                    resolve(`✅ Fulfilled promise in ${data.input}ms`)
                }
                else {
                    reject(`❌ Rejected promise in ${data.input}ms`)
                }
            }, data.input)
        })
    }
    clearForm()
    makePromise()
        .then((message) => {
            iziToast.show({
                message,
                messageColor: 'white',
                position: 'topRight',
                backgroundColor: 'green',
                close: false,
                progressBar: false,
            });
        })
        .catch((message) => {
         iziToast.show({
                message,
                messageColor: 'white',
                position: 'topRight',
                backgroundColor: '#f1807e',
                close: false,
                progressBar: false,
            });
    })
}


form.addEventListener("submit", onFormSubmit)
