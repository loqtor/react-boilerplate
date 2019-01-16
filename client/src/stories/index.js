import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import '../styles/app.scss';

import { Button } from '../views/components/Button';
import { Card } from '../views/components/Card';
import { Tout } from '../views/components/Tout';
import { Checkbox } from '../views/components/Checkbox';
import { Dropdown } from '../views/components/Dropdown';
import { Select } from '../views/components/Select';
import { Radio } from '../views/components/Radio';
import { Icon } from '../views/components/Icon';
import { IconWithText } from '../views/components/IconWithText';
import { Tabs } from '../views/components/Tabs';
import { UncontrolledField } from '../views/components/UncontrolledField';

storiesOf('Button', module)
  .add('standard with text', () => (
    <Button
      className="Button"
      isLinkButton={false}
      label="Hello Button"
      onClick={action('clicked')}
    />
  ))
  .add('is link', () => (
    <Button isLinkButton isRoute={false} url="/" label="Hello Button" onClick={action('clicked')} />
  ))
  .add('is link & opens in new tab', () => (
    <Button
      isLinkButton
      isRoute={false}
      url="/"
      label="Hello Button"
      newTab
      onClick={action('clicked')}
    />
  ))
  .add('with loader', () => (
    <Button
      className="Button"
      isLoading
      isLinkButton={false}
      isRoute={false}
      label="Hello Button"
      onClick={action('clicked')}
    />
  ));

storiesOf('Card', module).add('with text', () => <Card>Hello world</Card>);

storiesOf('Loader', module).add('in button', () => (
  <Button
    className="Button"
    isLoading
    isLinkButton={false}
    isRoute={false}
    label="Hello Button"
    onClick={action('clicked')}
  />
));

storiesOf('Checkbox', module).add('standard', () => (
  <Checkbox className="Checkbox" id="Checkbox" label="Subscribe" />
));

storiesOf('Radio button', module).add('standard', () => (
  <Radio className="Radio" id="Radio" label="Yes" />
));

storiesOf('Dropdown', module).add('standard', () => (
  <Dropdown
    value="1"
    options={[
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ]}
    className="Dropdown"
    id="Dropdown"
    label="Gender"
    type="checkbox"
  />
));

storiesOf('Select', module).add('standard', () => (
  <Select
    value="1"
    options={[
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ]}
    className="Dropdown"
    id="Select"
    label="Gender"
    type="checkbox"
  />
));

storiesOf('Icon', module).add('standard', () => <Icon name="dropdown" />);

storiesOf('IconWithText', module).add('standard', () => (
  <IconWithText name="dropdown">Hello world</IconWithText>
));

storiesOf('UncontrolledField', module)
  .add('standard, text field', () => (
    <UncontrolledField
      label="First name"
      placeholder="First name"
      validationMessage={"Please include an '@' in the email address"}
      id="UncontrolledField"
    />
  ))
  .add('email', () => (
    <UncontrolledField
      label="First name"
      placeholder="First name"
      type="email"
      id="UncontrolledField"
    />
  ))
  .add('with error', () => (
    <UncontrolledField
      label="First name"
      placeholder="First name"
      error="Please enter your first name"
      id="UncontrolledField"
    />
  ));

storiesOf('Tabs', module).add('standard', () => {
  const tabs = [
    {
      name: 'Login',
      content: 'Hello world, please login',
    },
    {
      name: 'Sign Up',
      content: 'Hello world, please sign up',
    },
  ];

  return (
    <Tabs
      headers={tabs.map(tab => tab.name)}
      renderActiveTab={(activeTabIndex) => {
        const activeTab = tabs[activeTabIndex];
        return activeTab.content;
      }}
    />
  );
});

storiesOf('Tout', module)
  .add('with default position', () => (
    <div
      style={{ minHeight: 300 }}
      className="u-mT-xl u-flex u-flexJustifyCenter u-flexAlignItemsCenter"
    >
      <Tout id="Tout-example" size="small" label="Hello world" />
    </div>
  ))
  .add('with position of top left', () => (
    <div
      style={{ minHeight: 300 }}
      className="u-mT-xl u-flex u-flexJustifyCenter u-flexAlignItemsCenter"
    >
      <Tout id="Tout-example" size="small" label="Hello world" position="topLeft" />
    </div>
  ))
  .add('with position of top right', () => (
    <div
      style={{ minHeight: 300 }}
      className="u-mT-xl u-flex u-flexJustifyCenter u-flexAlignItemsCenter"
    >
      <Tout id="Tout-example" size="small" label="Hello world" position="topRight" />
    </div>
  ))
  .add('with position of bottom center', () => (
    <div
      style={{ minHeight: 300 }}
      className="u-mT-xl u-flex u-flexJustifyCenter u-flexAlignItemsCenter"
    >
      <Tout id="Tout-example" size="small" label="Hello world" position="bottomCenter" />
    </div>
  ))
  .add('with position of bottom left', () => (
    <div
      style={{ minHeight: 300 }}
      className="u-mT-xl u-flex u-flexJustifyCenter u-flexAlignItemsCenter"
    >
      <Tout id="Tout-example" size="small" label="Hello world" position="bottomLeft" />
    </div>
  ))
  .add('with position of bottom right', () => (
    <div
      style={{ minHeight: 300 }}
      className="u-mT-xl u-flex u-flexJustifyCenter u-flexAlignItemsCenter"
    >
      <Tout id="Tout-example" size="small" label="Hello world" position="bottomRight" />
    </div>
  ))
  .add('with custom prompt content', () => (
    <div
      style={{ minHeight: 300 }}
      className="u-mT-xl u-flex u-flexJustifyCenter u-flexAlignItemsCenter"
    >
      <Tout id="Tout-example" size="small" label="Hello world" position="bottomCenter">
        <h1>Custom prompt</h1>
      </Tout>
    </div>
  ));
