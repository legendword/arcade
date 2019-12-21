import React, { Component } from 'react'

export class Modal extends Component {
    render() {
        return (
            <div className="modal" tabIndex="-1" style={{display:this.props.modal.show?"block":"none"}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{this.props.modal.title}</h5>
                        <button type="button" className="close" onClick={this.props.closeModal}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {this.props.modal.content}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={this.props.closeModal}>{this.props.modal.secondaryAction}</button>
                        <button type="button" className="btn btn-primary">{this.props.modal.primaryAction}</button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal
