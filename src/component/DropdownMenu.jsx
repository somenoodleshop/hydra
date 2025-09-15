import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/reusables/ui/select'
import { Text } from '~/reusables/ui/text'

const DropdownMenu = props => (
  <Select value={props.value} onValueChange={props.onChange}>
    <SelectTrigger className='min-w-[180px]'>
      <SelectValue placeholder='Select a model'>
        <Text>{ props.defaultValue }</Text>
      </SelectValue>
    </SelectTrigger>
    <SelectContent>
      { Object.keys(props.options).map(key => <SelectItem key={key} label={props.options[key]} value={key}><Text>{ props.options[key] }</Text></SelectItem>) }
    </SelectContent>
  </Select>
)

export default DropdownMenu
