(() => {
    const input = document.querySelector('#connect-session');
    const btn = document.querySelector('#btn-connect');
    const success = document.querySelector('#success');

    btn.addEventListener('click', e => {
        const session = input.value;

        e.preventDefault();
        const connect = new Connect({
            session: session,
        });

        connect.onLoad(() => {
            console.log('Connect Loaded')
        });

        connect.onAuthSuccess(() => {
            console.log('Auth success')
        });

        connect.onSuccess(() => {
            console.log('Success');
            const ct = document.querySelector('#connect-embedded');
            ct.style.display = 'none';
            success.innerHTML = 'Conta conectada com sucesso'
        });
    });
})();
