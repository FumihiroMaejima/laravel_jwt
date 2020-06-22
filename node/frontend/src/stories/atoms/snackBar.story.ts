import { addDecorator, storiesOf } from '@storybook/vue'
import { actions } from '@storybook/addon-actions'
import { withKnobs, text, select, boolean } from '@storybook/addon-knobs'
import SnackBar from '~/src/components/atoms/SnackBar.vue'

addDecorator(withKnobs)

storiesOf('SnackBar', module).add('default', () => ({
  components: { SnackBar },
  template: `
      <div>
        <SnackBar
          :text="text"
          :color="color"
          ref="toast"
        />
      </div>
    `,
  props: {
    text: {
      type: String,
      default: text('text', 'button text')
    },
    color: {
      type: String,
      default: select('color', ['green', 'red'], 'green')
    },
    buttonColor: {
      type: String,
      default: select('buttonColor', ['green', 'red'], '')
    },
    time: {
      type: Number,
      default: select('time', [50000, 80000], 50000)
    },
    isTop: {
      type: Boolean,
      default: boolean('isTop', false)
    },
    isRight: {
      type: Boolean,
      default: boolean('isRight', false)
    }
  },
  data() {
    return {
      open: true
    }
  },
  methods: {
    openData() {
      actions('action')
    }
  }
}))
