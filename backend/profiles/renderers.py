import json

from rest_framework.renderers import JSONRenderer


class ProfileJSONRenderer(JSONRenderer):
    charset = 'utf-8'

    def render(self, data, media_type=None, renderer_context=None):
        # Finally, we can render our data under the "profile" namespace.
        return json.dumps({
            'profile': data

        })
