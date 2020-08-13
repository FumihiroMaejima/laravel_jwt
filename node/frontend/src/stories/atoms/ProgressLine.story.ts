import { addDecorator, storiesOf } from '@storybook/vue'
// import { actions } from '@storybook/addon-actions'
import { withKnobs, select, boolean } from '@storybook/addon-knobs'
import ProgressLine from '~/src/components/atoms/ProgressLine.vue'

addDecorator(withKnobs)

storiesOf('ProgressLine', module).add(
  'progress-line',
  () => ({
    components: { ProgressLine },
    template: `
      <div>
        <progress-line
          :color="color"
          :open="open"
          :value="value"
          :fixed="fixed"
        />
      </div>
    `,
    props: {
      color: {
        type: String,
        default: select(
          'color',
          ['grey lighten-3', 'green', 'red'],
          'grey lighten-3'
        )
      },
      open: {
        type: Boolean,
        default: boolean('open', true)
      },
      value: {
        type: Number,
        default: select('value', [0, 15, 30, 45], 15)
      },
      fixed: {
        type: Boolean,
        default: boolean('fixed', true)
      }
    },
    data() {
      return {}
    },
    methods: {}
  }),
  {
    notes: `
      # Note Title\n

      ## Sub Title1\n

      ### list \n

      - list1 \n

      - list2 \n

      - list3 \n

      ### indent list \n

      - list4 \n
        - list5 \n
        - list6 \n

      ### another indent list \n

      * list7 \n
        * list8 \n
        * list9 \n

      ### number list \n

      1. list1 \n
      2. list2 \n
        3. list3 \n

      ### checkbox \n

      [x] check1 \n
      [x] check2 \n
      [x] check3 \n

      ### inline \n

      \`inlined text\` is here \n


      ### link \n

      [storybook link](https://storybook.js.org/) is here \n


      ### quote \n

      > text1 \n
      >> text2 \n

      ### image \n
      ![alternative text](URL "image_title")


      <img width="200" alt="alternative_text" src="URL">


      ### table \n

      | id | name | data |
      | :-- | :--: | --: |
      | 1 | name1 | data1 |
      | 2 | name2 | data2 |
      | 3 | name3 | data3 |


      ## Sub Title2\n

      ### text color\n

      <font color="Red">text1</font><br>
      <font color="blue">text2</font><br>

      <font color="green">text3</font> \n


      ### bold text \n

      **bold text**

      ### italic text \n

      *italic text*

      ### cancellation text \n

      ~~cancellation text~~

      ### horizon \n

      ***

      ---

      ### annnotation \n

      text[^1] \n
      [^1]: annotation content \n

      ## Sub Title3\n

      ### code \n

      \`\`\`HTML
        <p>test</p>
      \`\`\`

      \`\`\`JavaScript
        console.log()
      \`\`\`

      ---
    `
  }
)
