const ThreadCard = ({ thread }) => {
    return (
        <div>
            <p>Thread Name: {thread.colorName}</p>
            <p>DMC #: {thread.dmcCode}</p>
            <p>Swatch:
                <span
                    style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        backgroundColor: thread.hex,
                        border: "1px solid #000"
                    }}
                ></span>
            </p>
            <p>Projects Used:</p>
        </div>
    );
};

export default ThreadCard;