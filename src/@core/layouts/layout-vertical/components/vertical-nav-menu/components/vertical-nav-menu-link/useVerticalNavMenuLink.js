import { ref } from '@vue/composition-api'
import { isNavLinkActive, navLinkProps,navLinkProps2 } from '@core/layouts/utils'

export default function useVerticalNavMenuLink(item) {
  const isActive = ref(false)

  const linkProps = navLinkProps(item)

  const linkProps2 = navLinkProps2(item)

  const updateIsActive = () => {
    isActive.value = isNavLinkActive(item)
  }

  return {
    isActive,
    linkProps,
    linkProps2,
    updateIsActive,
  }
}
