import "../../chat.css";

const UserChatComponent = () => {
  return (
    <>
      <input type="checkbox" id="check" />
      <label htmlFor="check" className="chat-btn">
        <i className="bi bi-chat-dots comment"></i>
        <span className="position-absolute top-0 start-10 translate-middle p-2
         bg-danger border border-light rounded-circle"></span>
        <i className="bi bi-x-circle close"></i>
      </label>

      <div className="chat-wrabber">
        <div className="chat-header">
          <h6>Let's chat online</h6>
        </div>
        <div className="chat-form">
          <div className="chat-msg">
          {Array.from({length : 5}).map((_ , id) => 
          
          <div key={id}>
          <p>
              <b>You wrote:</b> Hello, world! This is a toast message.
            </p>
            <p className="bg-primary p-3 ms-4 text-light rounded-pill">
              <b>Support wrote:</b> Hello, world! This is a toast message.
            </p>
          </div>)}
          </div>
          <textarea
            id="clientChatMsg"
            className="form-control mt-2"
            placeholder="Your Text Message"
          ></textarea>

          <button className="btn btn-success btn-block">Submit</button>
        </div>
      </div>
    </>
  );
};

export default UserChatComponent;
