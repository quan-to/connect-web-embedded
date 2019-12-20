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

        connect.onSuccess(() => {
            const ct = document.querySelector('#connect');
            ct.style.display = 'none';
            success.innerHTML = 'Conta conectada com sucesso'
        });
    });
})();
