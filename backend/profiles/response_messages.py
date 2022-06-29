FOLLOW_USER_MSGS = {
    "USER_FOLLOW_SUCCESSFUL": "Followed. ",
    "USER_UNFOLLOW_SUCCESSFUL": "Unfollowed. ",
    "USER_NOT_FOUND": ("User could not be found."
                       " Cannot follow/unfollow a non-existent user."),
    "CANNOT_FOLLOW_SELF": ("You can only follow other users"
                           " and not yourself."),
    "CANNOT_UNFOLLOW_SELF": ("You can only"
                             " unfollow other "
                             "users and not yourself."),
    "USER_UNFOLLOWED_ALREADY": "You already do not follow the user.",
    "MY_FOLLOWERS_SUCCESSFUL": "Your followers and those you follow."
}

PROFILE_MSGS = {
    "MY_PROFILE": "Your profile details."
}


def get_followers_found_message(username):
    return f"Here are the users {username} follows and is followed by."
