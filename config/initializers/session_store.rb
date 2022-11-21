if Rails.env === 'production'
  Rails.application.config.session_store :cookie_store, key: '_easy-split-bills-app',
                                                        domain: 'easy-split-bills-app-json-api'
else
  Rails.application.config.session_store :cookie_store, key: '_easy-split-bills-app'
end
