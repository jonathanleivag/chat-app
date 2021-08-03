import { animateScroll } from 'react-scroll'

export function scrollToBottom (id) {
  animateScroll.scrollToBottom({ containerId: id, duration: 0 })
}

export function scrollToBottomAnimated (id) {
  animateScroll.scrollToBottom({ containerId: id, duration: 250 })
}
