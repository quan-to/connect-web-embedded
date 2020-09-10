const Render = (session: string, domain: string) => {
    const iframe = globalThis.document.createElement('iframe');
    iframe.setAttribute('src', `${session}&domain=${domain}&embedded=true`);
    iframe.setAttribute('id', 'connect-embedded-18100062243781');
    iframe.setAttribute('style', `
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        z-index: 2147483647;
        border-width: 0px;
        display: block;
        overflow: hidden auto;
        width: 100%;
        height: 100%;
    `);
    globalThis.document.body.appendChild(iframe);
};

export default Render;
