
export default {
  title: 'Internals/StartDateSelector',
  component: Recurrence
} as Meta

const Template: Story = (args) => <StartDateSelector {...args} />

export const EmptyStartDate = Template.bind({})
EmptyStartDate.decorators = [
  (Story) => (
    <RecurrenceProvider
      recurrence={{
        ...defaultStoryRecurrence,
        startDate: null
      }}
      onFieldChange={action('field changed')}
      onFieldsChange={action('fields changed')}
    >
      <Story />
    </RecurrenceProvider>
  )
]

export const StartDateChosen = Template.bind({})
StartDateChosen.decorators = [
  (Story) => (
    <RecurrenceProvider
      recurrence={{
        ...defaultStoryRecurrence,
        startDate: new Date()
      }}
      onFieldChange={action('field changed')}
      onFieldsChange={action('fields changed')}
    >
      <Story />
    </RecurrenceProvider>
  )
]

export const StartDateWithValidation = Template.bind({})
StartDateWithValidation.args = {
  recurrence: {
    ...defaultStoryRecurrence,
    startDate: new Date(0, 0, 0)
  }
}
