import type { codeToHtml, ThemeInput } from 'shiki'
import { useQuery } from '@tanstack/react-query'
import { createHighlighter } from 'shiki'

const theme: ThemeInput = {
  name: 'theme',
  type: 'dark',
  colors: {
    'focusBorder': '#ffcc66b3',
    'foreground': '#707a8c',
    'widget.shadow': '#12151cb3',
    'selection.background': '#409fff40',
    'icon.foreground': '#707a8c',
    'errorForeground': '#ff6666',
    'descriptionForeground': '#707a8c',
    'textBlockQuote.background': '#1c212b',
    'textLink.foreground': '#ffcc66',
    'textLink.activeForeground': '#ffcc66',
    'textPreformat.foreground': '#cccac2',
    'button.background': '#ffcc66',
    'button.foreground': '#1f2430',
    'button.hoverBackground': '#fac761',
    'button.secondaryBackground': '#707a8c33',
    'button.secondaryForeground': '#cccac2',
    'button.secondaryHoverBackground': '#707a8c80',
    'dropdown.background': '#242936',
    'dropdown.foreground': '#707a8c',
    'dropdown.border': '#707a8c45',
    'input.background': '#242936',
    'input.border': '#707a8c45',
    'input.foreground': '#cccac2',
    'input.placeholderForeground': '#707a8c80',
    'inputOption.activeBorder': '#ffcc664d',
    'inputOption.activeBackground': '#ffcc6633',
    'inputOption.activeForeground': '#ffcc66',
    'inputValidation.errorBackground': '#242936',
    'inputValidation.errorBorder': '#ff6666',
    'inputValidation.infoBackground': '#1f2430',
    'inputValidation.infoBorder': '#5ccfe6',
    'inputValidation.warningBackground': '#1f2430',
    'inputValidation.warningBorder': '#ffd173',
    'scrollbar.shadow': '#171b2400',
    'scrollbarSlider.background': '#707a8c66',
    'scrollbarSlider.hoverBackground': '#707a8c99',
    'scrollbarSlider.activeBackground': '#707a8cb3',
    'badge.background': '#ffcc6633',
    'badge.foreground': '#ffcc66',
    'progressBar.background': '#ffcc66',
    'list.activeSelectionBackground': '#63759926',
    'list.activeSelectionForeground': '#cccac2',
    'list.focusBackground': '#63759926',
    'list.focusForeground': '#cccac2',
    'list.focusOutline': '#63759926',
    'list.highlightForeground': '#ffcc66',
    'list.deemphasizedForeground': '#ff6666',
    'list.hoverBackground': '#63759926',
    'list.inactiveSelectionBackground': '#69758c1f',
    'list.inactiveSelectionForeground': '#707a8c',
    'list.invalidItemForeground': '#707a8c4d',
    'list.errorForeground': '#ff6666',
    'tree.indentGuidesStroke': '#8a919959',
    'listFilterWidget.background': '#1c212b',
    'listFilterWidget.outline': '#ffcc66',
    'listFilterWidget.noMatchesOutline': '#ff6666',
    'list.filterMatchBackground': '#5c467266',
    'list.filterMatchBorder': '#69538066',
    'activityBar.background': '#1f2430',
    'activityBar.foreground': '#707a8ccc',
    'activityBar.inactiveForeground': '#707a8c99',
    'activityBar.border': '#1f2430',
    'activityBar.activeBorder': '#ffcc66b3',
    'activityBarBadge.background': '#ffcc66',
    'activityBarBadge.foreground': '#1f2430',
    'sideBar.background': '#1f2430',
    'sideBar.border': '#1f2430',
    'sideBarTitle.foreground': '#707a8c',
    'sideBarSectionHeader.background': '#1f2430',
    'sideBarSectionHeader.foreground': '#707a8c',
    'sideBarSectionHeader.border': '#1f2430',
    'minimap.background': '#1f2430',
    'minimap.selectionHighlight': '#409fff40',
    'minimap.errorHighlight': '#ff6666',
    'minimap.findMatchHighlight': '#695380',
    'minimapGutter.addedBackground': '#87d96c',
    'minimapGutter.modifiedBackground': '#80bfff',
    'minimapGutter.deletedBackground': '#f27983',
    'editorGroup.border': '#171b24',
    'editorGroup.background': '#1c212b',
    'editorGroupHeader.noTabsBackground': '#1f2430',
    'editorGroupHeader.tabsBackground': '#1f2430',
    'editorGroupHeader.tabsBorder': '#1f2430',
    'tab.activeBackground': '#1f2430',
    'tab.activeForeground': '#cccac2',
    'tab.border': '#1f2430',
    'tab.activeBorder': '#ffcc66',
    'tab.unfocusedActiveBorder': '#707a8c',
    'tab.inactiveBackground': '#1f2430',
    'tab.inactiveForeground': '#707a8c',
    'tab.unfocusedActiveForeground': '#707a8c',
    'tab.unfocusedInactiveForeground': '#707a8c',
    'editor.background': '#1f2430',
    'editor.foreground': '#cccac2',
    'editorLineNumber.foreground': '#8a919966',
    'editorLineNumber.activeForeground': '#8a9199cc',
    'editorCursor.foreground': '#ffcc66',
    'editor.inactiveSelectionBackground': '#409fff21',
    'editor.selectionBackground': '#409fff40',
    'editor.selectionHighlightBackground': '#87d96c26',
    'editor.selectionHighlightBorder': '#87d96c00',
    'editor.wordHighlightBackground': '#80bfff14',
    'editor.wordHighlightStrongBackground': '#87d96c14',
    'editor.wordHighlightBorder': '#80bfff80',
    'editor.wordHighlightStrongBorder': '#87d96c80',
    'editor.findMatchBackground': '#695380',
    'editor.findMatchBorder': '#695380',
    'editor.findMatchHighlightBackground': '#69538066',
    'editor.findMatchHighlightBorder': '#5c467266',
    'editor.findRangeHighlightBackground': '#69538040',
    'editor.rangeHighlightBackground': '#69538033',
    'editor.lineHighlightBackground': '#1a1f29',
    'editorLink.activeForeground': '#ffcc66',
    'editorWhitespace.foreground': '#8a919966',
    'editorIndentGuide.background': '#8a91992e',
    'editorIndentGuide.activeBackground': '#8a919959',
    'editorRuler.foreground': '#8a91992e',
    'editorCodeLens.foreground': '#b8cfe680',
    'editorBracketMatch.background': '#8a91994d',
    'editorBracketMatch.border': '#8a91994d',
    'editor.snippetTabstopHighlightBackground': '#87d96c33',
    'editorOverviewRuler.border': '#171b24',
    'editorOverviewRuler.modifiedForeground': '#80bfff',
    'editorOverviewRuler.addedForeground': '#87d96c',
    'editorOverviewRuler.deletedForeground': '#f27983',
    'editorOverviewRuler.errorForeground': '#ff6666',
    'editorOverviewRuler.warningForeground': '#ffcc66',
    'editorOverviewRuler.bracketMatchForeground': '#8a9199b3',
    'editorOverviewRuler.wordHighlightForeground': '#80bfff66',
    'editorOverviewRuler.wordHighlightStrongForeground': '#87d96c66',
    'editorOverviewRuler.findMatchForeground': '#695380',
    'editorError.foreground': '#ff6666',
    'editorWarning.foreground': '#ffcc66',
    'editorGutter.modifiedBackground': '#80bfffcc',
    'editorGutter.addedBackground': '#87d96ccc',
    'editorGutter.deletedBackground': '#f27983cc',
    'diffEditor.insertedTextBackground': '#87d96c1f',
    'diffEditor.removedTextBackground': '#f279831f',
    'diffEditor.diagonalFill': '#171b24',
    'editorWidget.background': '#1c212b',
    'editorWidget.border': '#171b24',
    'editorHoverWidget.background': '#1c212b',
    'editorHoverWidget.border': '#171b24',
    'editorSuggestWidget.background': '#1c212b',
    'editorSuggestWidget.border': '#171b24',
    'editorSuggestWidget.highlightForeground': '#ffcc66',
    'editorSuggestWidget.selectedBackground': '#63759926',
    'debugExceptionWidget.border': '#171b24',
    'debugExceptionWidget.background': '#1c212b',
    'editorMarkerNavigation.background': '#1c212b',
    'peekView.border': '#63759926',
    'peekViewTitle.background': '#63759926',
    'peekViewTitleDescription.foreground': '#707a8c',
    'peekViewTitleLabel.foreground': '#cccac2',
    'peekViewEditor.background': '#1c212b',
    'peekViewEditor.matchHighlightBackground': '#69538066',
    'peekViewEditor.matchHighlightBorder': '#5c467266',
    'peekViewResult.background': '#1c212b',
    'peekViewResult.fileForeground': '#cccac2',
    'peekViewResult.lineForeground': '#707a8c',
    'peekViewResult.matchHighlightBackground': '#69538066',
    'peekViewResult.selectionBackground': '#63759926',
    'panel.background': '#1f2430',
    'panel.border': '#171b24',
    'panelTitle.activeBorder': '#ffcc66',
    'panelTitle.activeForeground': '#cccac2',
    'panelTitle.inactiveForeground': '#707a8c',
    'statusBar.background': '#1f2430',
    'statusBar.foreground': '#707a8c',
    'statusBar.border': '#1f2430',
    'statusBar.debuggingBackground': '#f29e74',
    'statusBar.debuggingForeground': '#242936',
    'statusBar.noFolderBackground': '#1c212b',
    'statusBarItem.activeBackground': '#707a8c33',
    'statusBarItem.hoverBackground': '#707a8c33',
    'statusBarItem.prominentBackground': '#171b24',
    'statusBarItem.prominentHoverBackground': '#00000030',
    'statusBarItem.remoteBackground': '#ffcc66',
    'statusBarItem.remoteForeground': '#242936',
    'titleBar.activeBackground': '#1f2430',
    'titleBar.activeForeground': '#cccac2',
    'titleBar.inactiveBackground': '#1f2430',
    'titleBar.inactiveForeground': '#707a8c',
    'titleBar.border': '#1f2430',
    'extensionButton.prominentForeground': '#242936',
    'extensionButton.prominentBackground': '#ffcc66',
    'extensionButton.prominentHoverBackground': '#fac761',
    'pickerGroup.border': '#171b24',
    'pickerGroup.foreground': '#707a8c80',
    'debugToolBar.background': '#1c212b',
    'debugIcon.breakpointForeground': '#f29e74',
    'debugIcon.breakpointDisabledForeground': '#f29e7480',
    'debugConsoleInputIcon.foreground': '#ffcc66',
    'welcomePage.tileBackground': '#1f2430',
    'welcomePage.tileShadow': '#12151cb3',
    'welcomePage.progress.background': '#1a1f29',
    'welcomePage.buttonBackground': '#ffcc6666',
    'walkThrough.embeddedEditorBackground': '#1c212b',
    'gitDecoration.modifiedResourceForeground': '#80bfffb3',
    'gitDecoration.deletedResourceForeground': '#f27983b3',
    'gitDecoration.untrackedResourceForeground': '#87d96cb3',
    'gitDecoration.ignoredResourceForeground': '#707a8c80',
    'gitDecoration.conflictingResourceForeground': '',
    'gitDecoration.submoduleResourceForeground': '#dfbfffb3',
    'settings.headerForeground': '#cccac2',
    'settings.modifiedItemIndicator': '#80bfff',
    'keybindingLabel.background': '#707a8c1a',
    'keybindingLabel.foreground': '#cccac2',
    'keybindingLabel.border': '#cccac21a',
    'keybindingLabel.bottomBorder': '#cccac21a',
    'terminal.background': '#1f2430',
    'terminal.foreground': '#cccac2',
    'terminal.ansiBlack': '#171b24',
    'terminal.ansiRed': '#ed8274',
    'terminal.ansiGreen': '#87d96c',
    'terminal.ansiYellow': '#facc6e',
    'terminal.ansiBlue': '#6dcbfa',
    'terminal.ansiMagenta': '#dabafa',
    'terminal.ansiCyan': '#90e1c6',
    'terminal.ansiWhite': '#c7c7c7',
    'terminal.ansiBrightBlack': '#686868',
    'terminal.ansiBrightRed': '#f28779',
    'terminal.ansiBrightGreen': '#d5ff80',
    'terminal.ansiBrightYellow': '#ffd173',
    'terminal.ansiBrightBlue': '#73d0ff',
    'terminal.ansiBrightMagenta': '#dfbfff',
    'terminal.ansiBrightCyan': '#95e6cb',
    'terminal.ansiBrightWhite': '#ffffff',
  },
  tokenColors: [
    {
      settings: {
        background: '#1f2430',
        foreground: '#cccac2',
      },
    },
    {
      name: 'Comment',
      scope: [
        'comment',
      ],
      settings: {
        fontStyle: 'italic',
        foreground: '#b8cfe680',
      },
    },
    {
      name: 'String',
      scope: [
        'string',
        'constant.other.symbol',
      ],
      settings: {
        foreground: '#d5ff80',
      },
    },
    {
      name: 'Regular Expressions and Escape Characters',
      scope: [
        'string.regexp',
        'constant.character',
        'constant.other',
      ],
      settings: {
        foreground: '#95e6cb',
      },
    },
    {
      name: 'Number',
      scope: [
        'constant.numeric',
      ],
      settings: {
        foreground: '#dfbfff',
      },
    },
    {
      name: 'Built-in constants',
      scope: [
        'constant.language',
      ],
      settings: {
        foreground: '#dfbfff',
      },
    },
    {
      name: 'Variable',
      scope: [
        'variable',
        'variable.parameter.function-call',
      ],
      settings: {
        foreground: '#cccac2',
      },
    },
    {
      name: 'Member Variable',
      scope: [
        'variable.member',
      ],
      settings: {
        foreground: '#f28779',
      },
    },
    {
      name: 'Language variable',
      scope: [
        'variable.language',
      ],
      settings: {
        fontStyle: 'italic',
        foreground: '#5ccfe6',
      },
    },
    {
      name: 'Storage',
      scope: [
        'storage',
      ],
      settings: {
        foreground: '#ffad66',
      },
    },
    {
      name: 'Keyword',
      scope: [
        'keyword',
      ],
      settings: {
        foreground: '#ffad66',
      },
    },
    {
      name: 'Operators',
      scope: [
        'keyword.operator',
      ],
      settings: {
        foreground: '#f29e74',
      },
    },
    {
      name: 'Separators like ; or ,',
      scope: [
        'punctuation.separator',
        'punctuation.terminator',
      ],
      settings: {
        foreground: '#cccac2b3',
      },
    },
    {
      name: 'Punctuation',
      scope: [
        'punctuation.section',
      ],
      settings: {
        foreground: '#cccac2',
      },
    },
    {
      name: 'Accessor',
      scope: [
        'punctuation.accessor',
      ],
      settings: {
        foreground: '#f29e74',
      },
    },
    {
      name: 'JavaScript/TypeScript interpolation punctuation',
      scope: [
        'punctuation.definition.template-expression',
      ],
      settings: {
        foreground: '#ffad66',
      },
    },
    {
      name: 'Ruby interpolation punctuation',
      scope: [
        'punctuation.section.embedded',
      ],
      settings: {
        foreground: '#ffad66',
      },
    },
    {
      name: 'Interpolation text',
      scope: [
        'meta.embedded',
      ],
      settings: {
        foreground: '#cccac2',
      },
    },
    {
      name: 'Types fixes',
      scope: [
        'source.java storage.type',
        'source.haskell storage.type',
        'source.c storage.type',
      ],
      settings: {
        foreground: '#73d0ff',
      },
    },
    {
      name: 'Inherited class type',
      scope: [
        'entity.other.inherited-class',
      ],
      settings: {
        foreground: '#5ccfe6',
      },
    },
    {
      name: 'Lambda arrow',
      scope: [
        'storage.type.function',
      ],
      settings: {
        foreground: '#ffad66',
      },
    },
    {
      name: 'Java primitive variable types',
      scope: [
        'source.java storage.type.primitive',
      ],
      settings: {
        foreground: '#5ccfe6',
      },
    },
    {
      name: 'Function name',
      scope: [
        'entity.name.function',
      ],
      settings: {
        foreground: '#ffd173',
      },
    },
    {
      name: 'Function arguments',
      scope: [
        'variable.parameter',
        'meta.parameter',
      ],
      settings: {
        foreground: '#dfbfff',
      },
    },
    {
      name: 'Function call',
      scope: [
        'variable.function',
        'variable.annotation',
        'meta.function-call.generic',
        'support.function.go',
      ],
      settings: {
        foreground: '#ffd173',
      },
    },
    {
      name: 'Library function',
      scope: [
        'support.function',
        'support.macro',
      ],
      settings: {
        foreground: '#f28779',
      },
    },
    {
      name: 'Imports and packages',
      scope: [
        'entity.name.import',
        'entity.name.package',
      ],
      settings: {
        foreground: '#d5ff80',
      },
    },
    {
      name: 'Entity name',
      scope: [
        'entity.name',
      ],
      settings: {
        foreground: '#73d0ff',
      },
    },
    {
      name: 'Tag',
      scope: [
        'entity.name.tag',
        'meta.tag.sgml',
      ],
      settings: {
        foreground: '#5ccfe6',
      },
    },
    {
      name: 'JSX Component',
      scope: [
        'support.class.component',
      ],
      settings: {
        foreground: '#73d0ff',
      },
    },
    {
      name: 'Tag start/end',
      scope: [
        'punctuation.definition.tag.end',
        'punctuation.definition.tag.begin',
        'punctuation.definition.tag',
      ],
      settings: {
        foreground: '#5ccfe680',
      },
    },
    {
      name: 'Tag attribute',
      scope: [
        'entity.other.attribute-name',
      ],
      settings: {
        foreground: '#ffd173',
      },
    },
    {
      name: 'Library constant',
      scope: [
        'support.constant',
      ],
      settings: {
        fontStyle: 'italic',
        foreground: '#f29e74',
      },
    },
    {
      name: 'Library class/type',
      scope: [
        'support.type',
        'support.class',
        'source.go storage.type',
      ],
      settings: {
        foreground: '#5ccfe6',
      },
    },
    {
      name: 'Decorators/annotation',
      scope: [
        'meta.decorator variable.other',
        'meta.decorator punctuation.decorator',
        'storage.type.annotation',
      ],
      settings: {
        foreground: '#ffdfb3',
      },
    },
    {
      name: 'Invalid',
      scope: [
        'invalid',
      ],
      settings: {
        foreground: '#ff6666',
      },
    },
    {
      name: 'diff.header',
      scope: [
        'meta.diff',
        'meta.diff.header',
      ],
      settings: {
        foreground: '#c594c5',
      },
    },
    {
      name: 'Ruby class methods',
      scope: [
        'source.ruby variable.other.readwrite',
      ],
      settings: {
        foreground: '#ffd173',
      },
    },
    {
      name: 'CSS tag names',
      scope: [
        'source.css entity.name.tag',
        'source.sass entity.name.tag',
        'source.scss entity.name.tag',
        'source.less entity.name.tag',
        'source.stylus entity.name.tag',
      ],
      settings: {
        foreground: '#73d0ff',
      },
    },
    {
      name: 'CSS browser prefix',
      scope: [
        'source.css support.type',
        'source.sass support.type',
        'source.scss support.type',
        'source.less support.type',
        'source.stylus support.type',
      ],
      settings: {
        foreground: '#b8cfe680',
      },
    },
    {
      name: 'CSS Properties',
      scope: [
        'support.type.property-name',
      ],
      settings: {
        fontStyle: 'normal',
        foreground: '#5ccfe6',
      },
    },
    {
      name: 'Search Results Numbers',
      scope: [
        'constant.numeric.line-number.find-in-files - match',
      ],
      settings: {
        foreground: '#b8cfe680',
      },
    },
    {
      name: 'Search Results Match Numbers',
      scope: [
        'constant.numeric.line-number.match',
      ],
      settings: {
        foreground: '#ffad66',
      },
    },
    {
      name: 'Search Results Lines',
      scope: [
        'entity.name.filename.find-in-files',
      ],
      settings: {
        foreground: '#d5ff80',
      },
    },
    {
      scope: [
        'message.error',
      ],
      settings: {
        foreground: '#ff6666',
      },
    },
    {
      name: 'Markup heading',
      scope: [
        'markup.heading',
        'markup.heading entity.name',
      ],
      settings: {
        fontStyle: 'bold',
        foreground: '#d5ff80',
      },
    },
    {
      name: 'Markup links',
      scope: [
        'markup.underline.link',
        'string.other.link',
      ],
      settings: {
        foreground: '#5ccfe6',
      },
    },
    {
      name: 'Markup Italic',
      scope: [
        'markup.italic',
      ],
      settings: {
        fontStyle: 'italic',
        foreground: '#f28779',
      },
    },
    {
      name: 'Markup Bold',
      scope: [
        'markup.bold',
      ],
      settings: {
        fontStyle: 'bold',
        foreground: '#f28779',
      },
    },
    {
      name: 'Markup Bold/italic',
      scope: [
        'markup.italic markup.bold',
        'markup.bold markup.italic',
      ],
      settings: {
        fontStyle: 'bold italic',
      },
    },
    {
      name: 'Markup Code',
      scope: [
        'markup.raw',
      ],
      settings: {
        background: '#cccac205',
      },
    },
    {
      name: 'Markup Code Inline',
      scope: [
        'markup.raw.inline',
      ],
      settings: {
        background: '#cccac20f',
      },
    },
    {
      name: 'Markdown Separator',
      scope: [
        'meta.separator',
      ],
      settings: {
        fontStyle: 'bold',
        background: '#cccac20f',
        foreground: '#b8cfe680',
      },
    },
    {
      name: 'Markup Blockquote',
      scope: [
        'markup.quote',
      ],
      settings: {
        foreground: '#95e6cb',
        fontStyle: 'italic',
      },
    },
    {
      name: 'Markup List Bullet',
      scope: [
        'markup.list punctuation.definition.list.begin',
      ],
      settings: {
        foreground: '#ffd173',
      },
    },
    {
      name: 'Markup added',
      scope: [
        'markup.inserted',
      ],
      settings: {
        foreground: '#87d96c',
      },
    },
    {
      name: 'Markup modified',
      scope: [
        'markup.changed',
      ],
      settings: {
        foreground: '#80bfff',
      },
    },
    {
      name: 'Markup removed',
      scope: [
        'markup.deleted',
      ],
      settings: {
        foreground: '#f27983',
      },
    },
    {
      name: 'Markup Strike',
      scope: [
        'markup.strike',
      ],
      settings: {
        foreground: '#ffdfb3',
      },
    },
    {
      name: 'Markup Table',
      scope: [
        'markup.table',
      ],
      settings: {
        background: '#cccac20f',
        foreground: '#5ccfe6',
      },
    },
    {
      name: 'Markup Raw Inline',
      scope: [
        'text.html.markdown markup.inline.raw',
      ],
      settings: {
        foreground: '#f29e74',
      },
    },
    {
      name: 'Markdown - Line Break',
      scope: [
        'text.html.markdown meta.dummy.line-break',
      ],
      settings: {
        background: '#b8cfe680',
        foreground: '#b8cfe680',
      },
    },
    {
      name: 'Markdown - Raw Block Fenced',
      scope: [
        'punctuation.definition.markdown',
      ],
      settings: {
        background: '#cccac2',
        foreground: '#b8cfe680',
      },
    },
  ],
  semanticHighlighting: true,
  semanticTokenColors: {
    'parameter.label': '#cccac2',
  },
}

interface Props {
  code: Parameters<typeof codeToHtml>[0]
  options: Parameters<typeof codeToHtml>[1]
}

function CodeHighlighter({ code, options }: Props) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['highlighter', code],
    queryFn: async () => {
      const highlighter = await createHighlighter({
        themes: [theme],
        langs: ['sql'],
      })
      return highlighter.codeToHtml(code, options)
    },
  })

  if (isPending)
    return <>加载中...</>

  if (isError) {
    console.error(error)
    return <>加载失败</>
  }

  // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
  return <div className="w-fit" dangerouslySetInnerHTML={{ __html: data }} />
}

export default CodeHighlighter
