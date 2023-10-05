export const callLoginAuth = async (loginInfo:any) => {
    try {
        console.log(loginInfo);
		const res = await fetch(`https://duck-cook-auth-ms.onrender.com/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(loginInfo)
        });
		return await res.json();
	} catch (err) {
		console.log(err);
	}
}