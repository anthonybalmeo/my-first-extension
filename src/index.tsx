import React, { FunctionComponent, useEffect, useState } from 'react'
import { JSONEditor } from '@json-editor/json-editor'
import { render } from 'react-dom';
import { TextInput } from '@contentful/forma-36-react-components';
import { init, FieldExtensionSDK, EntrySys } from 'contentful-ui-extensions-sdk';
import '@contentful/forma-36-react-components/dist/styles.css';
import './index.css';
import { jsonEditorConfig } from '../jsonEditorConfig';

interface AppProps {
  sdk: FieldExtensionSDK;
}


export const App: FunctionComponent<{sdk: FieldExtensionSDK}> = ({
  sdk
}) => {
  const [value, setValue] = useState<{ value: string }>()
  const [schemaIds, setSchemaIds] = useState<string[]>()

  const detachExternalChangeHandler = () => sdk.field.onValueChanged(setValue)

  

  useEffect(() => {
    setValue({
      value: sdk.field.getValue() || ''
    })
    sdk.window.startAutoResizer()
    const element = document.getElementById('editor_holder')
    const editor = new JSONEditor(element, jsonEditorConfig)
    editor.enable()
    // Gets all non archived Page Schema Entry of Content Type Page Schema
    sdk.space.getEntries({
      content_type: 'page-schema'
    }).then((entry) => {
      const filteredArchivedEntries = entry.items.filter(({ sys }: { sys: EntrySys }) => !sys.archivedVersion)
      const schemaIds = filteredArchivedEntries.map(({ fields }) => fields.name['en-US'])
      setSchemaIds(schemaIds)
    })
    return () => {
      detachExternalChangeHandler()
    }
  }, [])

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setValue({ value });
    if (value) {
      await sdk.field.setValue(value);
    } else {
      await sdk.field.removeValue();
    }
  }

  const onBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (schemaIds && !schemaIds.find(id => id === value)) {
      console.log('!!! error. Couldnt find existing Schema')
    }
    setValue({ value });
    if (value) {
      await sdk.field.setValue(value);
    } else {
      await sdk.field.removeValue();
    }
  }

  return (
    <div id="editor_holder">
      {/*
      Stock Text Component from Contentful React Components
      <TextInput
        width="large"
        type="text"
        id="my-field"
        testId="my-field"
        value={value && value.value || undefined}
        // onChange={onChange}
        onBlur={onBlur}
      /> */}
      </div>
    );
}



init(sdk => {
  render(<App sdk={sdk as FieldExtensionSDK} />, document.getElementById('root'));
});

/**
 * By default, iframe of the extension is fully reloaded on every save of a source file.
 * If you want to use HMR (hot module reload) instead of full reload, uncomment the following lines
 */
// if (module.hot) {
//   module.hot.accept();
// }
