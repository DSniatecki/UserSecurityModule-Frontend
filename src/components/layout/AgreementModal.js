import {Modal} from "antd";
import React, {Component} from "react";

class AgreementModal extends Component {
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div style={{display: 'inline'}}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a onClick={this.showModal} >agreement</a>

                <Modal
                    style={{ top: 20 }}
                    title="AGREEMENT"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>1. ................</p>
                    <p>2. ................</p>
                    <p>3. ................</p>
                    <p>4. ................</p>
                    <p>5. ................</p>
                    <p>5. ................</p>
                    <p>6. ................</p>
                    <p>7. ................</p>
                    <p>8. ................</p>
                    <p>9. ................</p>
                    <p>10. ................</p>
                    <p>11. ................</p>
                    <p>12. ................</p>
                    <p>13. ................</p>
                    <p>14. ................</p>
                    <p>15. ................</p>

                </Modal>
            </div>
        );
    }
}

export default AgreementModal;
