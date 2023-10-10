export const callRegisterAuth = async (registerInfo:any) => 
{
    validateFieldsRequired(registerInfo)

    /*try {
        console.log(registerInfo);
		const res = await fetch(`https://duck-cook-auth-ms.onrender.com/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(registerInfo)
        });
		return await res.json();
	} catch (err) {
		console.log(err);
	}*/
}

function validateFieldsRequired(registerInfo:any)
{
    for(let input in registerInfo)
    {
        if(!registerInfo[input].required) { continue }

        registerInfo[input].error = !registerInfo[input].value
        registerInfo[input].helperText = 'Campo obrigatório.'
    }
}