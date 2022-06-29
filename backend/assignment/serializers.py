from rest_framework import serializers

from django.contrib.auth.models import User

from .models import Assignment, Question, Choice, GradedAssignment


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class QuestionSerializer(serializers.ModelSerializer):
    choices = StringSerializer(many=True)

    class Meta:
        model = Question
        fields = ('id', 'choices', 'question', 'order')


class AssignmentSerializer(serializers.ModelSerializer):
    questions = serializers.SerializerMethodField()
    teacher = StringSerializer(many=False)

    class Meta:
        model = Assignment
        fields = ('__all__')

    def get_questions(self, obj):
        questions = QuestionSerializer(obj.questions.all(), many=True).data
        return questions

    def create(self, request):
        data = request.data
        print('CREATE ASSIGNMENT DATA', data)

        assignment = Assignment()
        teacher = User.objects.get(username=data['teacher'])
        assignment.teacher = teacher
        assignment.title = data['title']
        assignment.save()
        # print('CREATE ASSIGNMENT assignment  =====>  ', assignment)

        order = 1
        for q in data['questions']:
            # print('CREATE ASSIGNMENT Q', q)
            newQ = Question()
            newQ.question = q['title']
            newQ.order = order
            newQ.save()
            # print('CREATE ASSIGNMENT newQ-1', newQ)
            # print('CREATE ASSIGNMENT Q', q)

            for c in q['choices']:
                newC = Choice()
                newC.title = c
                newC.save()
                newQ.choices.add(newC)

            newQ.answer = Choice.objects.get(title=q['answer'])
            newQ.assignment = assignment
            # print('CREATE ASSIGNMENT newQ-2', newQ)
            newQ.save()
            order += 1
        # print('CREATE ASSIGNMENT assignment  =====>  ', assignment)
        return assignment



class GradedAssignmentSerializer(serializers.ModelSerializer):
    student = StringSerializer(many=False)

    class Meta:
        model = GradedAssignment
        fields = ('__all__')

    def create(self, request):
        data = request.data
        print('GRADED DATA  ======> ', data)

        assignment = Assignment.objects.get(id=data['asntId'])
        student = User.objects.get(username=data['username'])
        # student = User.objects.get(email=data['email'])

        graded_asnt = GradedAssignment()
        graded_asnt.assignment = assignment
        graded_asnt.student = student

        questions = [q for q in assignment.questions.all()]
        answers = [data['answers'][a] for a in data['answers']]

        answered_correct_count = 0
        for i in range(len(questions)):
            if questions[i].answer.title == answers[i]:
                answered_correct_count += 1
            i += 1

        grade = answered_correct_count / len(questions) * 100
        graded_asnt.grade = grade
        graded_asnt.save()
        return graded_asnt
