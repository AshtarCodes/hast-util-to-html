import test from 'tape'
import {h} from 'hastscript'
import {u} from 'unist-builder'
import {toHtml} from '../index.js'

test('`text`', function (t) {
  t.deepEqual(toHtml(u('text', 'alpha')), 'alpha', 'should serialize `text`s')

  t.deepEqual(
    toHtml(u('text', '3 < 5 & 7')),
    '3 &#x3C; 5 &#x26; 7',
    'should encode `text`s'
  )

  t.deepEqual(
    toHtml(h('style', u('text', '*:before {content: "3 < 5"}'))),
    '<style>*:before {content: "3 < 5"}</style>',
    'should not encode `text`s in `style`'
  )

  t.deepEqual(
    toHtml(h('script', u('text', 'alert("3 < 5")'))),
    '<script>alert("3 < 5")</script>',
    'should not encode `text`s in `script`'
  )

  t.deepEqual(
    toHtml(h('b', u('text', '3 < 5'))),
    '<b>3 &#x3C; 5</b>',
    'should encode `text`s in other nodes'
  )

  t.end()
})
