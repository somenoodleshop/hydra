import { View } from 'react-native'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism'

const Markdown = props => {
  const renderers = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '')
      return !inline && match ? (
        <SyntaxHighlighter
          style={okaidia}
          language={match[1]}
          PreTag='div'
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <View className={className} {...props}>
          { children }
        </View>
      )
    }
  }

  return (
    <>
      <ReactMarkdown components={renderers}>
        { props.children }
      </ReactMarkdown>
    </>
  )
}

export default Markdown
