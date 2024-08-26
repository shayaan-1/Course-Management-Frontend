import React from 'react';
import { Form, Input, Button, Radio, Select, Typography } from 'antd';

const { Title } = Typography;
const { TextArea } = Input;

const CustomForm = ({
  formConfig,
  onFinish,
  initialValues = {},
  title,
  buttonText,
  form  // Accept the form prop
}) => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Title level={2} className="text-center mb-6">{title}</Title>
      <Form
        form={form}  // Connect the form instance here
        layout="vertical"
        onFinish={onFinish}
        initialValues={initialValues}
        className="space-y-4"
      >
        {formConfig.map((field) => {
          if (field.type === 'custom') {
            return (
              <Form.Item key={field.name}>
                {field.render()}
              </Form.Item>
            );
          }

          return (
            <Form.Item
              key={field.name}
              name={field.name}
              label={field.label}
              rules={field.rules}
            >
              {field.type === 'input' && <Input placeholder={field.placeholder} />}
              {field.type === 'password' && <Input.Password placeholder={field.placeholder} />}
              {field.type === 'textarea' && <TextArea rows={4} placeholder={field.placeholder} />}
              {field.type === 'radio' && (
                <Radio.Group onChange={field.onChange} value={field.value}>
                  {field.options.map((option) => (
                    <Radio key={option.value} value={option.value}>
                      {option.label}
                    </Radio>
                  ))}
                </Radio.Group>
              )}
              {field.type === 'select' && (
                <Select placeholder={field.placeholder}>
                  {field.options.map((option) => (
                    <Select.Option key={option.value} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              )}
            </Form.Item>
          );
        })}
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full bg-blue-500 hover:bg-blue-600">
            {buttonText}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CustomForm;
