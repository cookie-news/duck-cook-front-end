export const callLoginAuth = async (loginInfo:any) => {
    try {
		const res = await fetch(`https://duck-cook-auth-ms.onrender.com/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        });
		const data = await res.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
}