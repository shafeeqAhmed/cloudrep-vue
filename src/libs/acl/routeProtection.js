import ability from './ability'

export const canNavigate = to => to.matched.some(route => {
    if (route.meta.resource == 'all') {
        return true
    } else {
        return ability.can(route.meta.action || 'all', route.meta.resource)
    }
})

export const _ = undefined
