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
            document.querySelector('#onLoaded').style.display = 'inline-block';
        });

        connect.onAuthSuccess(() => {
            document.querySelector('#onAuthSuccess').style.display = 'inline-block';
        });

        connect.onAuthFail(() => {
            document.querySelector('#onAuthFail').style.display = 'inline-block';
        });

        connect.onGrantedPermission(() => {
            document.querySelector('#onGrantedPermission').style.display = 'inline-block';
        });

        connect.onSelectBank(() => {
            document.querySelector('#onSelectBank').style.display = 'inline-block';
        });

        connect.onAddAccountSuccess(() => {
            document.querySelector('#onAddAccountSuccess').style.display = 'inline-block';
        });

        connect.onSuccess(() => {
            document.querySelector('#onSuccess').style.display = 'inline-block';
            const ct = document.querySelector('#connect-embedded');
            ct.style.display = 'none';
        });
    });
})();
