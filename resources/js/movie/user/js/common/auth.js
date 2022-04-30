export default {
    // Login
    login() {
        this.overlay = true
        this.form.post('/auth/login').then(response => {

            // Error
            if (resData.status == 'error') {
                console.log(resData)
                this.error = true
                this.errorMsg = resData.msg

            }

            // Success
            if (resData.status == 'success') {
                console.log(resData)
                this.error = false

            }

            this.overlay = false

        }).catch(error => {
            this.overlay = false;
        })
    },


    register() {
        this.form.post('/auth/register').then(response => {
            console.log(response);
        })
    }
}
