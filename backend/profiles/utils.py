from .models import Profile, CustomFollows


def get_follow_username_list(query_set, followers=False):
    """
    get_follow_username_list - Fetch the username list of followers/following

    Params:
    -------
        query_set (QuerySet): QuerySet object of a user's followers/following
        followers (bool, optional): Defaults to False. Lists followers if True
        lists following otherwise.

    Returns:
    --------
        List: List of all followers/following usernames or empty list otherwise
    """
    # Define an empty list to store all usernames found.
    username_list = []
    # For each found user profile id in the query_set object
    for follower_query_result in query_set:
        # Try find the profile details using the current element profile id
        # If followers param is True
        # Search for the people the user is followed by
        if not followers:
            profile = Profile.objects.get(
                id=follower_query_result.to_profile_id
            )
        # If followers param is False
        # Search for the people the user is following
        else:
            profile = Profile.objects.get(
                id=follower_query_result.from_profile_id
            )
        # Add the found username and email to the list
        user_details = {
            "username": profile.user.username,
            "email": profile.user.email
        }
        username_list.append(user_details)
    return username_list


def get_user_following_data(user_details):
    """
    Get the user following and following count based on their data.

    Params
    -------
        user_details: Object of user model providing the user details.

    Returns
    --------
    Dict object:
    {
        "following": List,
        "followers": List,
        "followingCount": Int,
        "followersCount": Int
    }
    """

    # Find the authors and users the user is following
    user_details_following = CustomFollows.objects.filter(
        from_profile_id=user_details.profile.id
    )
    # Find the authors and users the user is followed by
    user_details_followers = CustomFollows.objects.filter(
        to_profile_id=user_details.profile.id
    )
    # Get list of usernames of those being followed.
    user_following = get_follow_username_list(user_details_following)
    # And a list of usernames for those following the user
    user_followers = get_follow_username_list(
        user_details_followers, followers=True
    )
    # Count the number of users/authors followed by a user
    following_count = CustomFollows.objects.filter(
        from_profile_id=user_details.profile.id
    ).count()
    # Count the number of users/authors following a user
    followed_by_count = CustomFollows.objects.filter(
        to_profile_id=user_details.profile.id
    ).count()

    return {
        "following": user_following,
        "followers": user_followers,
        "followingCount": following_count,
        "followersCount": followed_by_count
    }
