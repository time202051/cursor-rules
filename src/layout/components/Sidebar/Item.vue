<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []
// `iconfont el-icon-${item.icon}`
    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon w']} />)
      } else {
        vnodes.push(<i class={`el-icon-${icon} svg-icon`}/>)
        // vnodes.push(<svg-icon icon-class={`el-icon-${icon} `}/>)
        // vnodes.push(<svg-icon icon-class={`${icon}`}/>)
      }
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>

<style scoped>
.w{
  width: 24px !important;
}
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
.svg-icon{
  color:#ccc;
}
</style>
