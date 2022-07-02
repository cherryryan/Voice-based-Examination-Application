package com.example.voiceassistantexamination;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;

import java.util.ArrayList;

class question{
    String question,answer,type;
    ArrayList<String> options=new ArrayList<>();
    question(String question,String answer,String type){
        this.question=question;
        this.answer=answer;
        this.type=type;
    }
    void display(){
        Log.d("question",question+" "+answer+" "+type+" "+options);
    }
    void addoption(String option){
        options.add(option);
    }
}
public class exam extends Fragment {
    RecyclerView r;
    void getData(){
        FirebaseDatabase database=FirebaseDatabase.getInstance();
        DatabaseReference ref=database.getReference("question_paper");
        ref.get().addOnCompleteListener(new OnCompleteListener<DataSnapshot>() {
            @Override
            public void onComplete(@NonNull Task<DataSnapshot> task) {
               //Toast.makeText(getActivity().getApplicationContext(), "hello",Toast.LENGTH_SHORT).show();
                listdata  obj[]=new listdata[(int) task.getResult().getChildrenCount()];
                int i=0;
                for(DataSnapshot d:task.getResult().getChildren()){
          //        Toast.makeText(getActivity().getApplicationContext(), d.toString(),Toast.LENGTH_SHORT).show();
                    Log.d("demo",d.getKey());
                    obj[i]=new listdata(d.getKey());
                    i++;
                }
                examadapter adapter=new examadapter(obj);
                r.setHasFixedSize(true);
                r.setLayoutManager(new LinearLayoutManager(getActivity().getApplicationContext()));
                r.setAdapter(adapter);
            }
        });
    }
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view= inflater.inflate(R.layout.exam,container,false);

        r=view.findViewById(R.id.examlist);

        getData();
        return view;
    }
}
