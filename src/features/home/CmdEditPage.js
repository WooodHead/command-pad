import React, { Component, PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Col, Form, Icon, Input, message, Popover, Row, Tooltip } from 'antd';
import * as actions from './redux/actions';

const FormItem = Form.Item;

export class CmdEditPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    params: PropTypes.object,
    form: PropTypes.object.isRequired,
  };

  getFormItemLabel(name, tooltip) {
    return (
      <Tooltip title={tooltip}>
        <span>
          <span>{name}</span>
          <Icon type="question-circle-o" />
        </span>
      </Tooltip>
    );
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const cmdId = this.props.params.cmdId;
    this.props.form.validateFields((errors, values) => {
      if (errors) {
        return;
      }
      this.props.actions.saveCmd(values, cmdId).then(() => {
        message.success('Add command success.');
        hashHistory.push('/');
      });
    });
  }

  render() {
    console.log('params: ', this.props.params);
    const { getFieldDecorator } = this.props.form;
    const cmdId = this.props.params.cmdId;
    return (
      <div className="home-cmd-edit-page">
        <div className="header">
          <Link to="/"><Icon type="arrow-left" /></Link>
          <h1>{cmdId ? 'Edit' : 'Add'} Command</h1>
        </div>
        <Form vertical required style={{ margin: 15 }} onSubmit={::this.handleSubmit}>
          <FormItem label="Name">
            {getFieldDecorator('name', {
              rules: [
                { required: true, whitespace: true, message: 'Name is required.' }
              ],
            })(
              <Input size="default" />
            )}
          </FormItem>
          <FormItem label={this.getFormItemLabel('Command', 'The command to run, e.g., "npm start"')}>
            {getFieldDecorator('cmd', {
              rules: [
                { required: true, message: 'Command is required.' }
              ],
            })(
              <Input size="default" />
            )}
          </FormItem>
          <FormItem label={this.getFormItemLabel('Working directory', 'Optional. The working directory to run the command.')}>
            {getFieldDecorator('cwd')(
              <Input size="default" />
            )}
          </FormItem>
          <FormItem label={this.getFormItemLabel('Url', 'Optional. If provided, there will be a link icon to open the url. Usually for dev server, e.g., "http://localhost:6076".')}>
            {getFieldDecorator('link')(
              <Input size="default" />
            )}
          </FormItem>
          <FormItem className="buttons">
            <Button size="default" type="primary" htmlType="submit">Ok</Button>
            <Button size="default" onClick={() => hashHistory.push('/')}>Cancel</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

CmdEditPage = Form.create()(CmdEditPage);

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CmdEditPage);