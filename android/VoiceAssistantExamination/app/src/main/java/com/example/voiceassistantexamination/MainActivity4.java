package com.example.voiceassistantexamination;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;
import android.app.ProgressDialog;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import android.speech.tts.TextToSpeech;
import android.speech.tts.UtteranceProgressListener;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TableLayout;
import android.widget.TableRow;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Locale;
import java.util.Objects;

public class MainActivity4 extends AppCompatActivity {
    private static final int REQUEST_CODE_SPEECH_INPUT = 1;
    private SpeechRecognizer speechRecognizer;
    String papername;
    int count=1;
    int position=0;
    ArrayList<String>answer =new ArrayList<>();
    TextToSpeech texttospeech;
    SpeechRecognizer speechtotext;
    Intent recognizer;
    ArrayList<question> myquestions=new ArrayList<>();
    TextView time;
    TableLayout question1;
    public void clearrows(){
        question1.removeAllViews();
    }
    public void addblank(question obj){
        clearrows();
        TableRow myrow=new TableRow(this);
        TableLayout.LayoutParams rowparams=new TableLayout.LayoutParams(TableLayout.LayoutParams.MATCH_PARENT,TableLayout.LayoutParams.MATCH_PARENT);
        myrow.setLayoutParams(rowparams);
        TextView text=new TextView(this);
        TableRow.LayoutParams textparams=new TableRow.LayoutParams(TableRow.LayoutParams.WRAP_CONTENT,TableLayout.LayoutParams.WRAP_CONTENT);
        text.setText(obj.question);
        text.setLayoutParams(textparams);
        text.setTextSize(20);
        text.setTextColor(Color.BLACK);
        myrow.addView(text);
        question1.addView(myrow);
        TableRow myrow1=new TableRow(this);
        TableLayout.LayoutParams rowparams1=new TableLayout.LayoutParams(TableLayout.LayoutParams.MATCH_PARENT,TableLayout.LayoutParams.MATCH_PARENT);
        myrow1.setLayoutParams(rowparams1);
        EditText answer=new EditText(this);
        TableRow.LayoutParams answerparams=new TableRow.LayoutParams(TableRow.LayoutParams.WRAP_CONTENT,TableLayout.LayoutParams.MATCH_PARENT);
        answer.setLayoutParams(answerparams);
        answer.setHint("Answer");
        myrow1.addView(answer);
        answer.setEnabled(false);
        question1.addView(myrow1);

    }
    public void addsinglechoice(question obj){
        clearrows();
        TableRow myrow=new TableRow(this);
        TableLayout.LayoutParams rowparams=new TableLayout.LayoutParams(TableLayout.LayoutParams.MATCH_PARENT,TableLayout.LayoutParams.MATCH_PARENT);
        myrow.setLayoutParams(rowparams);
        TextView text=new TextView(this);
        TableRow.LayoutParams textparams=new TableRow.LayoutParams(TableRow.LayoutParams.WRAP_CONTENT,TableLayout.LayoutParams.WRAP_CONTENT);
        text.setText(obj.question);
        text.setLayoutParams(textparams);
        text.setTextSize(20);
        text.setTextColor(Color.BLACK);
        myrow.addView(text);
        question1.addView(myrow);
        int n=obj.options.size(),i;
        TableRow myrow1=new TableRow(this);
        TableLayout.LayoutParams rowparams1=new TableLayout.LayoutParams(TableLayout.LayoutParams.MATCH_PARENT,TableLayout.LayoutParams.MATCH_PARENT);
        myrow1.setLayoutParams(rowparams1);
        RadioGroup group=new RadioGroup(this);
        TableRow.LayoutParams groupparams=new TableRow.LayoutParams(TableRow.LayoutParams.WRAP_CONTENT, TableRow.LayoutParams.WRAP_CONTENT);
        group.setLayoutParams(groupparams);
        for(i=0;i<n;i++){
            RadioButton button=new RadioButton(this);
            TableRow.LayoutParams buttonparams=new TableRow.LayoutParams(TableRow.LayoutParams.WRAP_CONTENT, TableRow.LayoutParams.WRAP_CONTENT);
            button.setLayoutParams(buttonparams);
            button.setText(obj.options.get(i));
            button.setTextSize(20);
            group.addView(button);
        }
        myrow1.addView(group);
        question1.addView(myrow1);

    }
    public void addmultiplechoice(question obj){
        clearrows();
        TableRow myrow=new TableRow(this);
        TableLayout.LayoutParams rowparams=new TableLayout.LayoutParams(TableLayout.LayoutParams.MATCH_PARENT,TableLayout.LayoutParams.MATCH_PARENT);
        myrow.setLayoutParams(rowparams);
        TextView text=new TextView(this);
        TableRow.LayoutParams textparams=new TableRow.LayoutParams(TableRow.LayoutParams.WRAP_CONTENT,TableLayout.LayoutParams.WRAP_CONTENT);
        text.setText(obj.question);
        text.setLayoutParams(textparams);
        text.setTextSize(20);
        text.setTextColor(Color.BLACK);
        myrow.addView(text);
        question1.addView(myrow);
        int n=obj.options.size(),i;

        for(i=0;i<n;i++){
            TableRow myrow1=new TableRow(this);
            TableLayout.LayoutParams rowparams1=new TableLayout.LayoutParams(TableRow.LayoutParams.WRAP_CONTENT, TableRow.LayoutParams.WRAP_CONTENT);
            myrow1.setLayoutParams(rowparams1);
            CheckBox button=new CheckBox(this);
            TableRow.LayoutParams buttonparams=new TableRow.LayoutParams(TableRow.LayoutParams.WRAP_CONTENT, TableRow.LayoutParams.WRAP_CONTENT);
            button.setLayoutParams(buttonparams);
            button.setText(obj.options.get(i));
            button.setTextSize(20);
            myrow1.addView(button);
            question1.addView(myrow1);
        }



    }
    public void fetchdata(String papername){
        ProgressDialog dialog=new ProgressDialog(this);
        dialog.setTitle("Fetching Questions...");
        dialog.show();
        FirebaseDatabase database=FirebaseDatabase.getInstance();
        DatabaseReference ref= database.getReference();
        ref.child("question_paper").child(papername).child("questions").get().addOnCompleteListener(new OnCompleteListener<DataSnapshot>() {
            @Override
            public void onComplete(@NonNull Task<DataSnapshot> task) {
                for(DataSnapshot data:task.getResult().getChildren()){
                    myquestions.add(new question(data.child("question").getValue().toString(),data.child("answer").getValue().toString(),data.child("questiontype").getValue().toString()));
                    if(data.child("options").getValue().toString().equalsIgnoreCase("")==false){
                        for(DataSnapshot data2: data.child("options").getChildren()){
                            myquestions.get(myquestions.size()-1).addoption(data2.getValue().toString());
                        }
                    }
                }
                dialog.dismiss();
                for(int i=0;i<myquestions.size();i++){
                    myquestions.get(i).display();
                }
                writeexam();
            }
        });



    }
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main4);
        Intent i=getIntent();
        Bundle b=i.getExtras();
         papername=b.getString("questionpapername");
        question1=findViewById(R.id.question);
        fetchdata(papername);
        texttospeech=new TextToSpeech(getApplicationContext(), new TextToSpeech.OnInitListener() {
            @Override
            public void onInit(int i) {
                if(i!= TextToSpeech.ERROR) {
                    texttospeech.setLanguage(Locale.UK);
                }


                }

        });
    }
    void stot(){
        Intent intent
                = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL,
                RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE,
                Locale.getDefault());
        intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Speak to text");

        try {
            startActivityForResult(intent, REQUEST_CODE_SPEECH_INPUT);
        }
        catch (Exception e) {
            Toast
                    .makeText(MainActivity4.this, " " + e.getMessage(),
                            Toast.LENGTH_SHORT)
                    .show();
        }
    }
    void single(question obj){
        addsinglechoice(myquestions.get(position));
        String s="";
        int i;
        for(i=0;i<obj.options.size();i++){
            s+="Option "+(i+1)+" is "+obj.options.get(i);
        }
        ttos("This is a single choice question. The Question is "+obj.question+" and the options are "+s);
    }
    void multiple(question obj){
        addmultiplechoice(myquestions.get(position));
        String s="";
        int i;
        for(i=0;i<obj.options.size();i++){
            s+="Option "+(i+1)+" is "+obj.options.get(i);
        }
        ttos("This is a multiple choice question. The Question is "+obj.question+" and the options are "+s);
    }
    void blank(question obj){
        addblank(myquestions.get(position));
            ttos("This is a Blank Question. The Question is "+obj.question);
    }
    void writeexam(){
            if( position<myquestions.size() && myquestions.get(position).type.equalsIgnoreCase("B") )
            blank(myquestions.get(position));
        if( position<myquestions.size() && myquestions.get(position).type.equalsIgnoreCase("S") )
            single(myquestions.get(position));
        if( position<myquestions.size() && myquestions.get(position).type.equalsIgnoreCase("M"))
            multiple(myquestions.get(position));
    }
    void ttos(String text){
        texttospeech.setSpeechRate(0.8f);
        HashMap<String, String> map = new HashMap<String, String>();
        map.put(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, "UniqueID");
        texttospeech.speak(text, TextToSpeech.QUEUE_FLUSH, map);
        texttospeech.setOnUtteranceCompletedListener(new TextToSpeech.OnUtteranceCompletedListener() {
            @Override
            public void onUtteranceCompleted(String s) {
                stot();
            }
        });
    }

    protected void onActivityResult(int requestCode, int resultCode,Intent data)
    {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_CODE_SPEECH_INPUT) {
            if (resultCode == RESULT_OK && data != null) {
                ArrayList<String> result = data.getStringArrayListExtra(
                        RecognizerIntent.EXTRA_RESULTS);
                Log.d("mytag",Objects.requireNonNull(result).get(0));
                answer.add(Objects.requireNonNull(result).get(0));
                Log.d("answer",answer.toString());
                position++;
                if(position==myquestions.size()){
                    helper obj=new helper(getApplicationContext());
                    FirebaseDatabase database=FirebaseDatabase.getInstance();
                    DatabaseReference ref=database.getReference();
                    int i;
                    for(i=0;i<answer.size();i++)
                    ref.child("Result").child(papername).child(obj.getuserno()).child(String.valueOf(i)).setValue(answer.get(i));
                    finish();
                }
                writeexam();

            }
        }
    }

}