export const jsonEditorConfig = {
    title: 'AB Test Schema Picker',
    schema: {
      title: 'AB Tests',
      type: 'object',
      required: ['name', 'buckets'],
      properties: {
        name: {
          type: 'string',
          description: 'AB Test Name',
          default: null,
        },
        buckets: {
          type: 'array',
          format: 'table',
          title: 'Buckets',
          uniqueItems: true,
          items: {
            type: 'object',
            title: 'Tests',
            properties: {
              bucket: {
                type: 'string',
              },
              variant: {
                type: 'string',
              },
            },
          },
        },
      },
    },
    startval: {},
    theme: 'bootstrap4',
    iconlib: 'bootstrap4',
    object_layout: 'normal',
    template: 'default',
    show_errors: 'interaction',
    required_by_default: 0,
    no_additional_properties: 0,
    display_required_only: 0,
    remove_empty_properties: 0,
    keep_oneof_values: 1,
    ajax: 0,
    ajaxCredentials: 0,
    show_opt_in: 0,
    disable_edit_json: 1,
    disable_collapse: 1,
    disable_properties: 1,
    disable_array_add: 0,
    disable_array_reorder: 0,
    disable_array_delete: 0,
    enable_array_copy: 0,
    array_controls_top: 0,
    disable_array_delete_all_rows: 0,
    disable_array_delete_last_row: 0,
    prompt_before_delete: 1,
    lib_aceeditor: 0,
    lib_autocomplete: 0,
    lib_sceditor: 0,
    lib_simplemde: 0,
    lib_select2: 0,
    lib_selectize: 0,
    lib_choices: 0,
    lib_flatpickr: 0,
    lib_signaturepad: 0,
    lib_mathjs: 0,
    lib_cleavejs: 0,
    lib_jodit: 0,
    lib_jquery: 0,
    lib_dompurify: 0,
    code:
      '// The following lines are mandatory and readonly. You can add custom code above and below.\nif (jseditor instanceof window.JSONEditor) jseditor.destroy();\njseditor = new window.JSONEditor(document.querySelector("#json-editor-form"), jedata);',
    style: '',
    desc: 'Add optional description here. (HTML format)',
  }