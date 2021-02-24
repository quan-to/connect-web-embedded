import { useState, useEffect, useRef } from 'react';
import { Connect } from '@quan-to/connect-web-embedded';

const EVENTS_BASE = {
  onLoaded: false,
  onAuthSuccess: false,
  onAuthFail: false,
  onGrantedPermission: false,
  onSelectBank: false,
  onAddAccountSuccess: false,
  onExit: false,
  onSuccess: false,
};

function App() {
  const [sessionId, setSessionId] = useState('');
  const [events, updateEvents] = useState(EVENTS_BASE);
  const connectRef = useRef(null);
  const handleCleanUp = () => {
    if (connectRef.current) {
      connectRef.current.cleanUp();
    }
  };

  const handleObserver = () => {
    handleCleanUp();
    connectRef.current = new Connect({
      session: sessionId,
      env: 'sandbox',
    });

    updateEvents(EVENTS_BASE);

    connectRef.current.onLoad((args1, args2, args3, args4, args5) => {
      updateEvents(newEvents => ({ ...newEvents, onLoaded: true }));
    });
    connectRef.current.onAuthSuccess((args1, args2, args3, args4, args5) => {
      console.log(args1, args2, args3, args4, args5);
      updateEvents(newEvents => ({ ...newEvents, onAuthSuccess: true }));
    });
    connectRef.current.onAuthFail((args1, args2, args3, args4, args5) => {
      console.log(args1, args2, args3, args4, args5);
      updateEvents(newEvents => ({ ...newEvents, onAuthFail: true }));
    });
    connectRef.current.onGrantedPermission(
      (args1, args2, args3, args4, args5) => {
        console.log(args1, args2, args3, args4, args5);
        updateEvents(newEvents => ({
          ...newEvents,
          onGrantedPermission: true,
        }));
      },
    );
    connectRef.current.onSelectBank((args1, args2, args3, args4, args5) => {
      console.log(args1, args2, args3, args4, args5);
      updateEvents(newEvents => ({ ...newEvents, onSelectBank: true }));
    });
    connectRef.current.onAddAccountSuccess(
      (args1, args2, args3, args4, args5) => {
        console.log(args1, args2, args3, args4, args5);
        updateEvents(newEvents => ({
          ...newEvents,
          onAddAccountSuccess: true,
        }));
      },
    );
    connectRef.current.onExit((args1, args2, args3, args4, args5) => {
      console.log(args1, args2, args3, args4, args5);
      updateEvents(newEvents => ({ ...newEvents, onExit: true }));
    });
    connectRef.current.onSuccess((args1, args2, args3, args4, args5) => {
      console.log(args1, args2, args3, args4, args5);
      updateEvents(newEvents => ({ ...newEvents, onSuccess: true }));
    });
  };

  useEffect(() => {
    return handleCleanUp;
  }, []);

  return (
    <div className="section no-pad-bot">
      <div className="container">
        <br />
        <br />
        <h1 className="header center orange-text">Connect Web Embedded</h1>
        <div className="row center">
          <h5 className="header col s12 light">
            Javascript Web Embedded to start Connect on Partner's application
          </h5>
        </div>

        <div className="row">
          <form className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="connect-session"
                  type="email"
                  className="validate"
                  onChange={event => setSessionId(event.target.value)}
                  value={sessionId}
                />
                <label htmlFor="connect-session">
                  Connect Session ID (sandbox)
                </label>
              </div>
            </div>
          </form>
        </div>

        <div className="row center">
          <button
            onClick={handleObserver}
            className="btn-large waves-effect waves-light blue"
          >
            Conectar com a Quanto
          </button>
        </div>

        <ul className="collection with-header">
          <li className="collection-header">
            <h4>Steps</h4>
          </li>
          {Object.keys(events).map(key => (
            <li className="collection-item" key={key}>
              {key}
              <em
                className="material-icons"
                style={{ display: events[key] ? 'inline-block' : 'none' }}
              >
                check
              </em>
            </li>
          ))}
        </ul>

        <br />
        <br />
      </div>
    </div>
  );
}

export default App;
