import React from "react";

class ResizableTextarea extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      rows: 1,
      minRows: 1,
      maxRows: 7,
    };
  }
  

  handleChange = (event) => {
    this.props.handleCommentChange(event);
    const textareaLineHeight = 24;
    const { minRows, maxRows } = this.state;

    const previousRows = event.target.rows;
    event.target.rows = minRows; 

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    this.setState({
      rows: currentRows < maxRows ? currentRows : maxRows,
    });
  };

  render() {
    return (
      <textarea
        rows={this.state.rows}
        value={this.props.newComment}
        maxLength="150"
        placeholder={this.props.placeholderText ? this.props.placeholderText : "Placeholder"}
        className={"textarea"}
        onChange={this.handleChange}
        ref={this.props.ref}
      />
    );
  }
}

export default ResizableTextarea;
