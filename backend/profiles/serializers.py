from rest_framework import serializers

# from articles.models import Articles
# from highlights.models import Highlights
from .models import Profile, CustomFollows
from django.contrib.auth.models import User



class GetProfileSerializer(serializers.ModelSerializer):
    """
    serializers for user profile upon user registration.
    """

    username = serializers.ReadOnlyField(source='get_username')
    # image_url = serializers.ReadOnlyField(source='get_cloudinary_url')

    class Meta:
        model = Profile

        fields = (
            'username', 'first_name', 'last_name', 'bio', 'image', 'image_url',
            'website', 'city', 'phone_number', 'country')

        read_only_fields = ("created_at", "updated_at")


class GetCurrentUserProfileSerializer(serializers.ModelSerializer):
    """
    serializers for current user profile.
    """

    # highlights_on_my_articles = serializers.SerializerMethodField()
    # my_follow_count = serializers.SerializerMethodField()
    # my_highlights = serializers.SerializerMethodField()
    # username = serializers.ReadOnlyField(source='get_username')
    # image_url = serializers.ReadOnlyField(source='get_cloudinary_url')

    class Meta:
        model = Profile

        # fields = '__all__'
        fields = (
            # 'username', 'first_name', 'last_name', 'bio', 'image', 'image_url',
            # 'website', 'city', 'phone', 'country', 
        
            'birth_date', 'is_teacher', 'is_student', 'bio',
            'website', 'phone_number', 'city', 'country', 

            # 'my_highlights', 'highlights_on_my_articles', 'my_follow_count'
            )

        read_only_fields = ("created_at", "updated_at")

    # def get_highlights_on_my_articles(self, obj):
    #     """
    #     Method to retrieve highlights made on my articles
    #     :return:
    #         List of highlights made on my articles
    #     """
    #     author_articles = Articles.objects.filter(author=obj.user)
    #     highlights_on_my_article = []
    #     for article in author_articles:
    #         total_article_highlights = Highlights.objects.filter(article=article).count()
    #         if total_article_highlights > 0:
    #             highlights_on_my_article.append(
    #                 {"article": {
    #                     "title": article.title,
    #                     "slug": article.slug
    #                 },
    #                     "totalHighlights": total_article_highlights
    #                 }
    #             )
    #     return highlights_on_my_article

    # def get_my_highlights(self, obj):
    #     """
    #     Method to retrieve my highlights details
    #     :param obj:
    #     :return:
    #     """
    #     highlights_article_ids = Highlights.objects.filter(profile=obj).values_list('article_id')
    #     highlighted_articles = Articles.objects.filter(id__in=highlights_article_ids)
    #     my_highlights = []
    #     for article in highlighted_articles:
    #         total_article_highlights = Highlights.objects.filter(profile=obj, article=article).count()
    #         my_highlights.append(
    #             {"article": {
    #                 "title": article.title,
    #                 "slug": article.slug
    #             },
    #                 "totalHighlights": total_article_highlights
    #             }
    #         )
    #     return my_highlights

    # def get_my_follow_count(self, obj):
    #     """
    #     Method to retrieve my followers and those I follow details
    #     :param obj:
    #     :return:
    #     """
    #     # Find the authors and users the current user is following
    #     followingCount = CustomFollows.objects.filter(
    #         from_profile_id=obj.id
    #     ).count()
    #     # Find the authors and users the current user is followed by
    #     followerCount = CustomFollows.objects.filter(
    #         to_profile_id=obj.id
    #     ).count()
    #     return {"followingCount": followingCount, "followerCount": followerCount}
