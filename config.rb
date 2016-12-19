require 'redcarpet'

activate :directory_indexes
activate :dato
activate :pagination

activate :external_pipeline,
  name: :webpack,
  command: build? ? "npm run build:assets" : "npm run start:assets",
  source: ".tmp/webpack_output",
  latency: 1

configure :development do
  activate :livereload
end

configure :build do
  activate :minify_html
end

helpers do
  def markdownify(text)
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::HTML)
    markdown.render(text)
  end
end

ignore '/templates/*'

paginate dato.works, "", "/templates/works.html", per_page: 5

dato.works.each do |work|
  proxy "/works/#{work.slug}/index.html", "/templates/work.html", locals: { work: work }
end
